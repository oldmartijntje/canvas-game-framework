import { IEngineStatus } from "./IEngineStatus";

export interface IStatusContext {
    setStatus(status: IEngineStatus): void;
    startLoop(): void;
    stopLoop(): void;
    update(dt: number): void; // advance game logic
    render(): void; // draw the current state
}