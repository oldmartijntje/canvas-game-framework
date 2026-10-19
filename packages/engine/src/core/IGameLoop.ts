export type GameLoopStatus = "stopped" | "running" | "paused";

export interface GameLoopOptions {
    fixedDeltaTime?: number;
    maxFrameDelta?: number;
    maxUpdatesPerFrame?: number;
    update?: (deltaTime: number) => void;
    render?: (interpolation: number) => void;
    now?: () => number;
    requestFrame?: (callback: (timestamp: number) => void) => number;
    cancelFrame?: (handle: number) => void;
}

export interface IGameLoop {
    readonly status: GameLoopStatus;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    step(deltaTime?: number): void;
}
