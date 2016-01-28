///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSEntry from "./opds_entry";
import OPDSLink from "./opds_link";
import LinkParser from "./link_parser";
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

    let rawLinks = entry[atomPrefix + "link"];
    let links: Array<OPDSLink>;
    if (rawLinks) {
      links = rawLinks.map((link) => {
        return linkParser.parse(link);
      });
    } else {
      links = [];
    }

    let rawIdentifiers = entry[dcPrefix + "identifier"];
    let identifiers: Array<string>;
    if (rawIdentifiers) {
      identifiers = rawIdentifiers.map((identifier) => {
        return identifier["_"];
      });
    }

    let issued: string;
    let rawIssued = entry[dcPrefix + "issued"];
    if (rawIssued && rawIssued.length > 0) {
      issued = rawIssued[0]["_"];
    }
    return new OPDSEntry(id, updated, title, links, identifiers, issued);
  }
}