export interface ICanvasHandler {
    /**
     * Register a HTML canvas into the CanvasHandler
     */
    register(jquerySelector: string): boolean;
    /**
     * Let the CanvasHandler create a canvas for you, as a child of the selected element.
     */
    generate(jquerySelector: string): boolean;

    render(): void;
}