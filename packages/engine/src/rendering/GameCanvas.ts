import { IGameCanvas } from "./IGameCanvas";

export class GameCanvas implements IGameCanvas {
    private htmlCanvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D | null;
    constructor(element: HTMLCanvasElement) {
        this.htmlCanvas = element;
        this.canvasContext = element.getContext("2d");
    }
}