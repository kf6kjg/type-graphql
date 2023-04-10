# Patches

## `@types/shelljs`

Solves:

```plaintext
node_modules/@types/shelljs/index.d.ts:1209:23 - error TS2694: Namespace '"type-graphql/node_modules/glob/dist/mjs/index"' has no exported member 'IOptions'.

1209     globOptions: glob.IOptions;
```

ShellJS uses a VERY old version of glob: `^7`. In `type-graphql` we have `^9`, and it looks like 10 is current. Somewhere in those majore revisions the `IOptions` type was repalced with `GlobOptions`. `@types/shelljs` should be updated.
