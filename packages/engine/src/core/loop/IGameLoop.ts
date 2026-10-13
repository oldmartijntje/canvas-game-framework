// core/loop/IGameLoop.ts
export type FrameCallback = (dt: number) => void;

export interface IGameLoop {
    readonly isRunning: boolean;
    start(): void;
    stop(): void;
}