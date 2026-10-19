import { GameLoop, GameLoopStatus } from "../src";

describe("GameLoop", () => {
    it("updates using a fixed timestep and renders the remainder", () => {
        const updates: number[] = [];
        const interpolations: number[] = [];
        let frame: ((timestamp: number) => void) | undefined;
        const loop = new GameLoop({
            fixedDeltaTime: 0.1,
            now: () => 0,
            requestFrame: (callback) => {
                frame = callback;
                return 1;
            },
            cancelFrame: () => {},
            update: (deltaTime) => updates.push(deltaTime),
            render: (interpolation) => interpolations.push(interpolation)
        });

        loop.start();
        frame?.(250);

        expect(updates).toEqual([0.1, 0.1]);
        expect(interpolations).toEqual([0.5]);
        expect(loop.status).toBe<GameLoopStatus>("running");
    });

    it("does not schedule frames while paused and resumes without a pause spike", () => {
        let currentTime = 0;
        let frame: ((timestamp: number) => void) | undefined;
        let scheduledFrames = 0;
        const updates: number[] = [];
        const loop = new GameLoop({
            fixedDeltaTime: 0.1,
            now: () => currentTime,
            requestFrame: (callback) => {
                frame = callback;
                scheduledFrames++;
                return scheduledFrames;
            },
            cancelFrame: () => {},
            update: (deltaTime) => updates.push(deltaTime)
        });

        loop.start();
        loop.pause();
        currentTime = 10_000;
        loop.resume();
        frame?.(10_000);

        expect(updates).toHaveLength(0);
        expect(scheduledFrames).toBe(2);
    });

    it("supports a deterministic manual step", () => {
        const updates: number[] = [];
        const loop = new GameLoop({
            update: (deltaTime) => updates.push(deltaTime)
        });

        loop.step(0.05);

        expect(updates).toEqual([0.05]);
    });
});
