import { IEngineStatus } from "./IEngineStatus";
import { IStatusContext } from "./IStatusContext";
import { RunningEngineStatus } from "./RunningEngineStatus";
import { StoppedEngineStatus } from "./StoppedEngineStatus";

export class PausedEngineStatus implements IEngineStatus {
    readonly name = "paused";
    readonly isRunning = false;

    onEnter() { }
    onExit() { }

    tick(ctx: IStatusContext) {
        ctx.render(); // keep drawing, but don't update logic
    }

    start(ctx: IStatusContext) { ctx.setStatus(new RunningEngineStatus()); }
    stop(ctx: IStatusContext) { ctx.setStatus(new StoppedEngineStatus()); }
    pause() { }
}