import { GameCanvas } from "../index";
import { IGameCanvas } from "../interfaces/IGameCanvas";
import $ from "jquery";


export class CanvasHandler {
    private canvases: IGameCanvas[] = [];


    /**
     * Register a HTML canvas into the CanvasHandler
     */
    public register(jquerySelector: string): boolean {
        const element = $(jquerySelector).get(0);

        if (!(element instanceof HTMLCanvasElement)) {
            console.error(
                `CanvasHandler.register: "${jquerySelector}" is not a canvas element.`,
                element ?? "(no element found)"
            );
            return false;
        }
        this.addCanvas(element);
        return true;
    }

    private addCanvas(canvas: HTMLCanvasElement) {
        this.canvases.push(new GameCanvas(canvas));
    }

    /**
     * Let the CanvasHandler create a canvas for you, as a child of the selected element.
     */
    public generate(jquerySelector: string): boolean {
        const canvasContainer = $(jquerySelector);

        if (canvasContainer.length === 0) {
            console.error(
                `CanvasHandler.generate: no container found for "${jquerySelector}".`
            );
            return false;
        }

        const newCanvas: HTMLCanvasElement = document.createElement("canvas");
        canvasContainer.first().append(newCanvas);
        this.addCanvas(newCanvas);
        return true;
    }
}