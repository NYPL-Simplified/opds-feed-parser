import XMLInterface = require("./xml_interface");
import PrefixMap from "./prefix_map";

export default class Xml2jsOutputParser<T> {
  prefixes: PrefixMap;
  constructor(prefixes: PrefixMap) {
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

  parseSubtag<U>(tag: XMLInterface.XMLTagWithSubtags, subtagName: string, subtagParser: Xml2jsOutputParser<U>): U {
    let subtags = this.parseSubtags(tag, subtagName, subtagParser);
    return subtags.length > 0 ? subtags[0] : null;
  }
}