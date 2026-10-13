import { IEngineStatus } from "./IEngineStatus";
import { IStatusContext } from "./IStatusContext";
import { PausedEngineStatus } from "./PausedEngineStatus";
import { StoppedEngineStatus } from "./StoppedEngineStatus";

export class RunningEngineStatus implements IEngineStatus {
    readonly name = "running";
    readonly isRunning = true;

    onEnter(ctx: IStatusContext) { ctx.startLoop(); }
    onExit() { }

    tick(ctx: IStatusContext, dt: number) {
        ctx.update(dt);
        ctx.render();
    }

    start() { }
    stop(ctx: IStatusContext) { ctx.setStatus(new StoppedEngineStatus()); }
    pause(ctx: IStatusContext) { ctx.setStatus(new PausedEngineStatus()); }
}