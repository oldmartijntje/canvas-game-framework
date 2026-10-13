import { IEngineStatus } from "./IEngineStatus";
import { IStatusContext } from "./IStatusContext";
import { RunningEngineStatus } from "./RunningEngineStatus";

export class StoppedEngineStatus implements IEngineStatus {
    readonly name = "stopped";
    readonly isRunning = false;

    onEnter(ctx: IStatusContext) { ctx.stopLoop(); }
    onExit() { }
    tick() { } // nothing happens

    start(ctx: IStatusContext) { ctx.setStatus(new RunningEngineStatus()); }
    stop() { }
    pause() { }
}