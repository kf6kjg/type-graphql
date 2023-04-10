# Patches

## `@types/shelljs`

Solves:

```plaintext
node_modules/@types/shelljs/index.d.ts:1209:23 - error TS2694: Namespace '"type-graphql/node_modules/glob/dist/mjs/index"' has no exported member 'IOptions'.

1209     globOptions: glob.IOptions;
```

ShellJS uses a VERY old version of glob: `^7`. In `type-graphql` we have `^9`, and it looks like 10 is current. Somewhere in those majore revisions the `IOptions` type was repalced with `GlobOptions`. `@types/shelljs` should be updated.

## `class-validator`

Solves:

```plaintext
../node_modules/class-validator/types/decorator/string/IsPhoneNumber.d.ts:2:29 - error TS1479: The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("libphonenumber-js")' call instead.

2 import { CountryCode } from 'libphonenumber-js';
```

The package `class-validator` uses the types-in-separate-folder method of handling the types for the CJS and ESM code. However since `libphonenumber-js` [isn't correctly handling node16 under CJS](https://arethetypeswrong.github.io/?p=libphonenumber-js%405.0.1) and is instead handing ESM to CJS modules, [reported and apparently misunderstood](https://gitlab.com/catamphetamine/libphonenumber-js/-/issues/96), we get the above error since our own library is being treated as CJS by TypeScript.

Patching `class-validator` to report as ESM-only is NOT a valid solution but demonstrates what happens when we finally get to a purely ESM import tree:

```sh
$ npm ci
$ cd examples-esm
$ npm ci
$ npm run build

../build/typings/schema/build-context.d.ts:1:39 - error TS1479: The current file is a CommonJS module whose imports will produce 'require' calls
however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("class-validator")' call instead.

1 import type { ValidatorOptions } from "class-validator"
```

Which is what was reported in #1442.
