import Author from "./author";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class AuthorParser extends Xml2jsOutputParser<Author> {
  parse(author: any): Author {
    let name = this.parseSubtagContent(author, "name");
    let uri = this.parseSubtagContent(author, "uri");
    return new Author(name, uri);
  }
}