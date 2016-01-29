import Category from "./category";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class CategoryParser extends Xml2jsOutputParser<Category> {
  parse(category: any): Category {
    let term = this.parseAttribute(category, "term");
    let scheme = this.parseAttribute(category, "scheme");
    let label = this.parseAttribute(category, "label");

    return new Category(term, scheme, label);
  }
}