# opds-feed-parser

Javascript OPDS feed parser. Covers [OPDS 1.1](http://opds-spec.org/specs/opds-catalog-1-1-20110627/).


## Usage

```sh
npm install opds-feed-parser
```

Example:
```js
var Parser = require("opds-feed-parser").default;
var request = require("request");

var parser = new Parser();
request("http://feedbooks.github.io/opds-test-catalog/catalog/acquisition/blocks.xml", (error, response, body) => {
    var promise = parser.parse(body);
    promise.then((result) => {
        console.dir(result);
    });
```

## Setup

Version `0.1.0` requires Node 20 or higher.

The previous working version, `0.0.18` can be used with Node version < 18.

It is recommended to use [`nvm`](https://github.com/nvm-sh/nvm) to install different versions of Node needed on your machine.


## License

```
Copyright © 2015 The New York Public Library, Astor, Lenox, and Tilden Foundations

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
