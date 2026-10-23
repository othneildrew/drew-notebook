# Drew's Notebook

A Docusaurus site of live experiments. Each experiment is a React component rendered at the top of its page, with its full source below and auto-generated debug controls ([lil-gui](https://lil-gui.georgealways.com/)) on the right.

## Development

```bash
npm install
npm start
```

| Script              | Purpose               |
| ------------------- | --------------------- |
| `npm run build`     | Production build      |
| `npm run typecheck` | Type-check with `tsc` |
| `npm run lint`      | Lint with ESLint      |
| `npm run format`    | Format with Prettier  |

## Adding an experiment

1. Create `src/experiments/<topic>/<Name>.tsx` with a default-exported component. Call `useControls({...})` from `src/components/Experiment/useControls.ts` to get live values and a controls panel.
2. Create `experiments/<topic>/<name>.mdx` with `experiment: true` and `hide_table_of_contents: true` in its front matter, rendering `<Experiment>` as in the existing pages.
