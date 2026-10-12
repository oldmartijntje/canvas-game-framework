# Canvas Game Framework

A game development framework for HTML Canvas.

## Prerequisites

- **Node.js**: [Download and installation](https://nodejs.org/)
- **npm**: included with Node.js

## Installation

Install dependencies from the repository root:

```bash
npm install
```

## Scripts

- `npm run dev` :arrow_right: Rebuild the engine on change and serve the test game with Vite.
- `npm run build` :arrow_right: Build the engine package using tsup.
- `npm run build:game` :arrow_right: Build the private test game with Vite.
- `npm run test` :arrow_right: Run the engine's Jest tests.
- `npm run coverage` :arrow_right: Run the engine's tests with coverage.
- `npm run lint` :arrow_right: Check code quality with Biome.

The published npm package is [`packages/engine`](./packages/engine). The private test game in
[`examples/test-game`](./examples/test-game) consumes the local workspace package and is never published.

To publish only the engine:

```bash
npm publish -w packages/engine --access public
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file.

## Acknowledgments

- [Jest](https://jestjs.io/) :arrow_right: JavaScript testing.
- [Tsup](https://tsup.egoist.sh/) :arrow_right: TypeScript bundling.
- [TypeScript](https://www.typescriptlang.org/) :arrow_right: Typed JavaScript.
- [Husky](https://typicode.github.io/husky/) :arrow_right: Git hooks.
- [Vite](https://vite.dev/) :arrow_right: The test game's development server.
- [Biome](https://biomejs.dev/) :arrow_right: Formatting and linting.
