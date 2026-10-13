// src/core/GameEngineOptions.ts

import { CanvasHandler } from "../rendering/CanvasHandler";
import { ICanvasHandler } from "../rendering/ICanvasHandler";
import { GameLoop } from "./loop/GameLoop";
import { IGameLoop } from "./loop/IGameLoop";

/** Passed to the constructor. */
export interface GameEngineOptions {
    fps?: number;
    debug?: boolean;
    canvasHandler?: ICanvasHandler;
    gameLoop?: IGameLoop | null;
}

/** Passed to engine.start(). */
export interface GameEngineStartOptions {
    canvasTest?: boolean;
}

export type ResolvedGameEngineOptions = Required<GameEngineOptions>;
export type ResolvedGameEngineStartOptions = Required<GameEngineStartOptions>;

export function resolveGameEngineOptions(
    options: GameEngineOptions = {},
): ResolvedGameEngineOptions {
    return {
        fps: options.fps ?? 0,
        debug: options.debug ?? false,
        canvasHandler: options.canvasHandler ?? new CanvasHandler(),
        gameLoop: options.gameLoop ?? null
    };
}

export function resolveGameEngineStartOptions(
    options: GameEngineStartOptions = {},
): ResolvedGameEngineStartOptions {
    return {
        canvasTest: options.canvasTest ?? false
    };
}
