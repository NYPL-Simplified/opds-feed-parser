import OPDSEntry from "./opds_entry";
import LinkParser from "./link_parser";
import AuthorParser from "./author_parser";
import CategoryParser from "./category_parser";
import NamespaceParser from "./namespace_parser";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class EntryParser extends Xml2jsOutputParser {
  parse(entry: any): OPDSEntry {
    let linkParser = new LinkParser(this.prefixes);
    let atomPrefix = this.prefixes[NamespaceParser.ATOM_URI];
    let dcPrefix = this.prefixes[NamespaceParser.DC_URI];

    let id = this.parseSubtagContent(entry, atomPrefix + "id");
    let updated = this.parseSubtagContent(entry, atomPrefix + "updated");
    let title = this.parseSubtagContent(entry, atomPrefix + "title");

    let authorParser = new AuthorParser(this.prefixes);
    let authors = this.parseSubtags(entry, atomPrefix + "author", authorParser);

    let links = this.parseSubtags(entry, atomPrefix + "link", linkParser);

    let categoryParser = new CategoryParser(this.prefixes);
    let categories = this.parseSubtags(entry, atomPrefix + "category", categoryParser);

    let rawIdentifiers = entry[dcPrefix + "identifier"];
    let identifiers: Array<string>;
    if (rawIdentifiers && rawIdentifiers.length > 0) {
      identifiers = rawIdentifiers.map((identifier) => {
        return identifier["_"];
      });
    } else {
      identifiers = [];
    }

    let issued = this.parseSubtagContent(entry, dcPrefix + "issued");

    return new OPDSEntry(id, updated, title, authors, links, categories, identifiers, issued);
  }
}