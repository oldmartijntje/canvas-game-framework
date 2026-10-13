import { CanvasHandler } from "./CanvasHandler";
const arbitrary_version_for_debugging: number = 1;

export class GameEngine {
    private canvasHandler: CanvasHandler = new CanvasHandler();

    public static engineVersion(): string {
        return `This is canvas-game-development-framework v${arbitrary_version_for_debugging}; This doesn't align with npm version; Only use this for debugging.`;
    }

    public canvas(): CanvasHandler {
        return this.canvasHandler;
    }
}