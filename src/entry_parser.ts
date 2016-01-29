///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSEntry from "./opds_entry";
import OPDSLink from "./opds_link";
import Author from "./author";
import Category from "./category";
import LinkParser from "./link_parser";
import AuthorParser from "./author_parser";
import CategoryParser from "./category_parser";
import NamespaceParser from "./namespace_parser";
import XMLInterface = require("./xml_interface");

export default class EntryParser {
  private prefixes: Immutable.Map<string, string>;
  constructor(prefixes: Immutable.Map<string, string>) {
    this.prefixes = prefixes;
  }

  parse(entry: XMLInterface.XMLEntry): OPDSEntry {
    let linkParser = new LinkParser(this.prefixes);
    let atomPrefix = this.prefixes[NamespaceParser.ATOM_URI];
    let dcPrefix = this.prefixes[NamespaceParser.DC_URI];

    let id: string;
    let rawIds = entry[atomPrefix + "id"];
    if (rawIds && rawIds.length > 0) {
      id = rawIds[0]["_"];
    }

    let updated: string;
    let rawUpdated = entry[atomPrefix + "updated"];
    if (rawUpdated && rawUpdated.length > 0) {
      updated = rawUpdated[0]["_"];
    }

    let title: string;
    let rawTitle = entry[atomPrefix + "title"];
    if (rawTitle && rawTitle.length > 0) {
      title = rawTitle[0]["_"];
    }

    let authors: Array<Author>;
    let rawAuthors = entry[atomPrefix + "author"];
    if (rawAuthors && rawAuthors.length > 0) {
      let authorParser = new AuthorParser(this.prefixes);
      authors = rawAuthors.map((author) => {
        return authorParser.parse(author);
      });
    } else {
      authors = [];
    }

    let rawLinks = entry[atomPrefix + "link"];
    let links: Array<OPDSLink>;
    if (rawLinks && rawLinks.length > 0) {
      links = rawLinks.map((link) => {
        return linkParser.parse(link);
      });
    } else {
      links = [];
    }

    let rawCategories = entry[atomPrefix + "category"];
    let categories: Array<Category>;
    if (rawCategories && rawCategories.length > 0) {
      let categoryParser = new CategoryParser(this.prefixes);
      categories = rawCategories.map((category) => {
        return categoryParser.parse(category);
      });
    } else {
      categories = [];
    }

    let rawIdentifiers = entry[dcPrefix + "identifier"];
    let identifiers: Array<string>;
    if (rawIdentifiers && rawIdentifiers.length > 0) {
      identifiers = rawIdentifiers.map((identifier) => {
        return identifier["_"];
      });
    } else {
      identifiers = [];
    }

    let issued: string;
    let rawIssued = entry[dcPrefix + "issued"];
    if (rawIssued && rawIssued.length > 0) {
      issued = rawIssued[0]["_"];
    }
    return new OPDSEntry(id, updated, title, authors, links, categories, identifiers, issued);
  }
}