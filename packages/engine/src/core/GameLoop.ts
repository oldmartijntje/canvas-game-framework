import { GameLoopOptions, GameLoopStatus, IGameLoop } from "./IGameLoop";

const defaultNow = (): number => {
    if (typeof performance !== "undefined") {
        return performance.now();
    }

    return Date.now();
};

const defaultRequestFrame = (callback: (timestamp: number) => void): number => {
    if (typeof requestAnimationFrame !== "undefined") {
        return requestAnimationFrame(callback);
    }

    return setTimeout(() => callback(defaultNow()), 1000 / 60) as unknown as number;
};

const defaultCancelFrame = (handle: number): void => {
    if (typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(handle);
        return;
    }

    clearTimeout(handle as unknown as ReturnType<typeof setTimeout>);
};

export class GameLoop implements IGameLoop {
    private readonly fixedDeltaTime: number;
    private readonly maxFrameDelta: number;
    private readonly maxUpdatesPerFrame: number;
    private readonly updateCallback: (deltaTime: number) => void;
    private readonly renderCallback: (interpolation: number) => void;
    private readonly now: () => number;
    private readonly requestFrame: (callback: (timestamp: number) => void) => number;
    private readonly cancelFrame: (handle: number) => void;
    private loopStatus: GameLoopStatus = "stopped";
    private frameHandle: number | null = null;
    private lastTimestamp: number | null = null;
    private accumulator = 0;

    public constructor(options: GameLoopOptions = {}) {
        this.fixedDeltaTime = options.fixedDeltaTime ?? 1 / 60;
        this.maxFrameDelta = options.maxFrameDelta ?? 0.25;
        this.maxUpdatesPerFrame = options.maxUpdatesPerFrame ?? 5;

        if (this.fixedDeltaTime <= 0 || this.maxFrameDelta <= 0 || this.maxUpdatesPerFrame < 1) {
            throw new RangeError("Game loop timing options must be positive.");
        }

        this.updateCallback = options.update ?? (() => { });
        this.renderCallback = options.render ?? (() => { });
        this.now = options.now ?? defaultNow;
        this.requestFrame = options.requestFrame ?? defaultRequestFrame;
        this.cancelFrame = options.cancelFrame ?? defaultCancelFrame;
    }

    public get status(): GameLoopStatus {
        return this.loopStatus;
    }

    public start(): void {
        if (this.loopStatus === "running") {
            return;
        }

        this.loopStatus = "running";
        this.lastTimestamp = this.now();
        this.scheduleNextFrame();
    }

    public stop(): void {
        this.cancelScheduledFrame();
        this.loopStatus = "stopped";
        this.lastTimestamp = null;
        this.accumulator = 0;
    }

    public pause(): void {
        if (this.loopStatus !== "running") {
            return;
        }

        this.cancelScheduledFrame();
        this.loopStatus = "paused";
        this.lastTimestamp = null;
    }

    public resume(): void {
        if (this.loopStatus !== "paused") {
            return;
        }

        this.loopStatus = "running";
        this.lastTimestamp = this.now();
        this.scheduleNextFrame();
    }

    public step(deltaTime = this.fixedDeltaTime): void {
        if (deltaTime <= 0) {
            throw new RangeError("Step delta time must be positive.");
        }

        this.updateCallback(deltaTime);
        this.renderCallback(0);
    }

    private scheduleNextFrame(): void {
        this.frameHandle = this.requestFrame((timestamp) => this.onFrame(timestamp));
    }

    private cancelScheduledFrame(): void {
        if (this.frameHandle === null) {
            return;
        }

        this.cancelFrame(this.frameHandle);
        this.frameHandle = null;
    }

    private onFrame(timestamp: number): void {
        this.frameHandle = null;
        if (this.loopStatus !== "running") {
            return;
        }

        const previousTimestamp = this.lastTimestamp ?? timestamp;
        const frameDelta = Math.min(Math.max(0, (timestamp - previousTimestamp) / 1000), this.maxFrameDelta);
        this.lastTimestamp = timestamp;
        this.accumulator += frameDelta;

        let updates = 0;
        while (this.accumulator >= this.fixedDeltaTime && updates < this.maxUpdatesPerFrame) {
            this.updateCallback(this.fixedDeltaTime);
            this.accumulator -= this.fixedDeltaTime;
            updates++;
        }

        if (updates === this.maxUpdatesPerFrame && this.accumulator >= this.fixedDeltaTime) {
            this.accumulator = 0;
        }

        this.renderCallback(this.accumulator / this.fixedDeltaTime);
        this.scheduleNextFrame();
    }
}
