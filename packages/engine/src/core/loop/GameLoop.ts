import { FrameCallback, IGameLoop } from "./IGameLoop";

// core/loop/GameLoop.ts
export class GameLoop implements IGameLoop {
    private frameId: number | null = null;
    private lastTime = 0;

    constructor(
        private readonly onFrame: FrameCallback,
        private readonly maxDt = 0.1, // clamp after a tab switch or lag spike
    ) { }

    get isRunning(): boolean {
        return this.frameId !== null;
    }

    start(): void {
        if (this.isRunning) return;
        this.lastTime = performance.now();
        this.frameId = requestAnimationFrame(this.frame);
    }

    stop(): void {
        if (this.frameId === null) return;
        cancelAnimationFrame(this.frameId);
        this.frameId = null;
    }

    private frame = (time: number): void => {
        const dt = Math.min((time - this.lastTime) / 1000, this.maxDt);
        this.lastTime = time;

        // Schedule first so a stop() inside onFrame cancels the next frame.
        this.frameId = requestAnimationFrame(this.frame);
        this.onFrame(dt);
    };
}