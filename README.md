# wasm-game-of-life

An implementation of Conway's Game of Life in Rust and WebAssembly as outlined in the [official tutorial](https://rustwasm.github.io/docs/book/game-of-life/setup.html).

## Commands

### Build with `wasm-pack build`

```
wasm-pack build
```

### Test in Headless Browsers with `wasm-pack test`

```
wasm-pack test --headless --firefox
```

### Install web dependencies with `pnpm`

```
cd www
pnpm run start
```

### Serve with `pnpm`

```
cd www
pnpm run start
```

### Deploy to GitHub Pages with `pnpm`

```
pushd www
pnpm build
popd
mv www/dist docs
```
