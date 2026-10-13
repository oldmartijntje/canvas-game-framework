import { IGameCanvas } from "../interfaces/IGameCanvas";

export class GameCanvas implements IGameCanvas {
    private htmlCanvas: HTMLCanvasElement;
    constructor(element: HTMLCanvasElement) {
        this.htmlCanvas = element;
    }
}