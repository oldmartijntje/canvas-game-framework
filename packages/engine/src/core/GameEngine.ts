import { ICanvasHandler } from "../rendering/ICanvasHandler";
import { resolveGameEngineOptions, GameEngineOptions, GameEngineStartOptions, ResolvedGameEngineOptions, resolveGameEngineStartOptions } from "./GameEngineOptions";
import { GameLoop } from "./loop/GameLoop";
import { IGameLoop } from "./loop/IGameLoop";
import { IEngineStatus } from "./status/IEngineStatus";
import { IStatusContext } from "./status/IStatusContext";
import { StoppedEngineStatus } from "./status/StoppedEngineStatus";
const arbitrary_version_for_debugging: number = 2;

type StatusListener = (status: IEngineStatus) => void;

export class GameEngine implements IStatusContext {
    private status: IEngineStatus = new StoppedEngineStatus();
    private readonly loop: IGameLoop;
    private listeners = new Set<StatusListener>();
    private canvasHandler: ICanvasHandler;
    private options: ResolvedGameEngineOptions;

    constructor(options: GameEngineOptions = {}) {
        this.options = resolveGameEngineOptions(options);
        this.canvasHandler = this.options.canvasHandler;
        this.loop = this.options.gameLoop ?? new GameLoop((dt) => this.status.tick(this, dt));
    }

    setStatus(next: IEngineStatus): void {
        this.status.onExit(this);
        this.status = next;
        next.onEnter(this);
    }

    get canvas(): ICanvasHandler {
        return this.canvasHandler;
    }

    get statusName() { return this.status.name; }

    get isRunning(): boolean {
        return this.status.isRunning;
    }

    onStatusChange(fn: StatusListener) {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn); // unsubscribe
    }

    public static engineVersion(): string {
        return `This is canvas-game-development-framework v${arbitrary_version_for_debugging}; This doesn't align with npm version; Only use this for debugging.`;
    }

    start(options: GameEngineStartOptions = {}): void {
        this.status.start(this, resolveGameEngineStartOptions(options));
    }

    stop(): void {
        this.status.stop(this);
    }

    pause(): void {
        this.status.pause(this);
    }

    startLoop(): void {
        this.loop.start();
    }
    stopLoop(): void {
        this.loop.stop();
    }

    update(dt: number): void {
        /* game objects, physics */
    }
    render(): void {
        this.canvasHandler.render();
    }

}