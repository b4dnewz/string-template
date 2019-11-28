# string-template

> A utility to format strings with many options

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Getting started

Download it using your favourite package manager.

```
npm i @b4dnewz/string-template
```

Then import it in your code and __have fun__ formatting strings.

```js
import template from "@b4dnewz/string-template";

const str = `
    That's an awfully hot {item},
    did {person} kill himself?
    Probably {answer}.
`;

template(str, {
    item: "coffee pot",
    person: "Jeffrey Epstein",
    answer: "not"
});
```

By default the function will fail if unknown properties are found, but can be disabled using options.

## Using custom pattern

The string template function will use this pattern `{%s}`, for finding variables in the string, where __%s__ will be replaced with the built-in word match pattern which is not customizable.

If you want to use a different template pattern you can add the __pattern__ option as third parameter.

```js
const str = `Using a <:adjective:> pattern`;

const out = template(str, {
    adjective: "different"
}, {
    pattern: "<:%s:>"
});

console.log(out);
```

## Options

#### pattern

Type: `string`

The string template pattern to use for finding replacements, it __must use__ the string replacer `%s` to know where to put the word pattern.

```js
template(input, replacements, {
    pattern: ":%s:"
});
```

#### ignoreErrors

Type: `boolean`

When `true` unknown properties in the string will not raise an error and will simply ignored.

```js
template(input, replacements, {
    ignoreErrors: true
});
```

---

## License

This package is released under [MIT License](./LICENSE) © [Filippo Conti](https://b4dnewz.github.io/)


[npm-image]: https://badge.fury.io/js/%40b4dnewz%2Fstring-template.svg
[npm-url]: https://npmjs.org/package/@b4dnewz/string-template
[travis-image]: https://travis-ci.org/b4dnewz/string-template.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/string-template
[coveralls-image]: https://coveralls.io/repos/b4dnewz/string-template/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/string-template