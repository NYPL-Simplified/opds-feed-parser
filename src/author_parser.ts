///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import Author from "./author";

export default class AuthorParser {
  private prefixes: Immutable.Map<string, string>;
  constructor(prefixes: Immutable.Map<string, string>) {
    this.prefixes = prefixes;
  }

  parse(author: any): Author {
    let name: string;
    let rawName = author["name"];
    if (rawName && rawName.length > 0) {
      name = rawName[0]["_"];
    }

    let uri: string;
    let rawUri = author["uri"];
    if (rawUri && rawUri.length > 0) {
      uri = rawUri[0]["_"];
    }

    return new Author(name, uri);
  }
}