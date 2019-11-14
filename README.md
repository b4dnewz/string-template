# string-template

> A utility to format strings with many options

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Getting started

Download it using your favourite package manager.

```
npm i @b4dnewz/string-template
```

Then import it in your code and have fun formatting strings.

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

---

## License

This package is released under [MIT License](./LICENSE) © [Filippo Conti](https://b4dnewz.github.io/)


[npm-image]: https://badge.fury.io/js/%40b4dnewz%2Fstring-template.svg
[npm-url]: https://npmjs.org/package/@b4dnewz/string-template
[travis-image]: https://travis-ci.org/b4dnewz/string-template.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/string-template
[coveralls-image]: https://coveralls.io/repos/b4dnewz/string-template/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/string-template