import { GameLoop } from "./GameLoop";
import { GameLoopOptions, GameLoopStatus, IGameLoop } from "./IGameLoop";

export interface GameEngineOptions extends GameLoopOptions { }

export class GameEngine {
    private readonly gameLoop: IGameLoop;
    private readonly updateCallback: (deltaTime: number) => void;
    private readonly renderCallback: (interpolation: number) => void;

    public constructor(options: GameEngineOptions = {}) {
        this.updateCallback = options.update ?? (() => { });
        this.renderCallback = options.render ?? (() => { });
        this.gameLoop = new GameLoop({
            ...options,
            update: (deltaTime) => this.tick(deltaTime),
            render: (interpolation) => this.render(interpolation)
        });
    }

    protected tick(deltaTime: number): void {
        // console.log(`run tick(${deltaTime})`)
        // add logic here
        this.updateCallback(deltaTime); // i can keep this for easy hooks into the game-engine.
    }

    protected render(interpolation: number): void {
        // console.log(`run render(${interpolation})`)
        // add logic here
        this.renderCallback(interpolation); // i can keep this for easy hooks into the game-engine.
    }

    public get status(): GameLoopStatus {
        return this.gameLoop.status;
    }

    public start(): void {
        this.gameLoop.start();
    }

    public stop(): void {
        this.gameLoop.stop();
    }

    public pause(): void {
        this.gameLoop.pause();
    }

    public resume(): void {
        this.gameLoop.resume();
    }

    public step(deltaTime?: number): void {
        this.gameLoop.step(deltaTime);
    }
}
