///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSEntry from "./opds_entry";
import OPDSLink from "./opds_link";
import OPDSLinkParser from "./opds_link_parser";
import XMLInterface = require("./xml_interface");

let opdsLinkParser = new OPDSLinkParser();

export default class OPDSEntryParser {
  parse(entry: XMLInterface.XMLEntry, atomPrefix: string): OPDSEntry {
    let rawLinks = entry[atomPrefix + "link"];
    let links: Array<OPDSLink>;
    if (rawLinks) {
      links = rawLinks.map((link) => {
        return opdsLinkParser.parse(link);
      });
    } else {
      links = [];
    }
    return new OPDSEntry(links);
  }
}