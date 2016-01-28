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

    let rawLinks = entry[atomPrefix + "link"];
    let links: Array<OPDSLink>;
    if (rawLinks) {
      links = rawLinks.map((link) => {
        return linkParser.parse(link);
      });
    } else {
      links = [];
    }
    return new OPDSEntry(links);
  }
}