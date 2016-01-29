///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import Category from "./category";
import XMLInterface = require("./xml_interface");

export default class CategoryParser {
  private prefixes: Immutable.Map<string, string>;
  constructor(prefixes: Immutable.Map<string, string>) {
    this.prefixes = prefixes;
  }

  parse(category: XMLInterface.XMLCategory): Category {
    let term = category["$"].term.value;
    let scheme = category["$"].scheme.value;
    let label = category["$"].label.value;

    return new Category(term, scheme, label);
  }
}