import { ResolvedGameEngineStartOptions } from "../GameEngineOptions";
import { IStatusContext } from "./IStatusContext";

// core/status/IEngineStatus.ts
export interface IEngineStatus {
    readonly name: string;
    readonly isRunning: boolean;

    onEnter(ctx: IStatusContext): void; // what happens when entering this state
    onExit(ctx: IStatusContext): void; // handling the exising of this state
    tick(ctx: IStatusContext, dt: number): void;

    start(engine: IStatusContext, options: ResolvedGameEngineStartOptions): void;
    stop(engine: IStatusContext): void;
    pause(engine: IStatusContext): void;
}