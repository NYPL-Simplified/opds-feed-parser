///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import XMLInterface = require("./xml_interface");

export default class Xml2jsOutputParser<T> {
  prefixes: Immutable.Map<string, string>;
  constructor(prefixes: Immutable.Map<string, string>) {
    this.prefixes = prefixes;
  }

  parse(tag: any): T {
    throw new Error("must be implemented in subclass");
  }

  parseAttribute(tag: XMLInterface.XMLTagWithAttributes, attributeName: string): any {
    let attribute = tag["$"][attributeName];
    if (attribute) {
      return attribute.value;
    } else {
      return undefined;
    }
  }

  parseSubtagContent(tag: XMLInterface.XMLTagWithSubtags, subtagName: string): any {
    let subtag = tag[subtagName];
    if (subtag && subtag.length > 0) {
      return subtag[0]["_"];
    } else {
      return undefined;
    }
  }

  parseSubtags<U>(tag: XMLInterface.XMLTagWithSubtags, subtagName: string, subtagParser: Xml2jsOutputParser<U>): Array<U> {
    let subtags = tag[subtagName];
    let parsed: Array<U>;
    if (subtags && subtags.length) {
      parsed = subtags.map((subtag) => {
        return subtagParser.parse(subtag);
      });
    } else {
      parsed = [];
    }
    return parsed;
  }
}