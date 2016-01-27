///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSFeed from "./opds_feed";
import OPDSLink from "./opds_link";
import OPDSEntry from "./opds_entry";
import NavigationFeed from "./navigation_feed";
import AcquisitionFeed from "./acquisition_feed";
import LinkParser from "./link_parser";
import EntryParser from "./entry_parser";
import NamespaceParser from "./namespace_parser";
import XMLInterface = require("./xml_interface");

let linkParser = new LinkParser();
let entryParser = new EntryParser();
let namespaceParser = new NamespaceParser();

export default class FeedParser {
  static OPDS_ACQUISITION_REL = "http://opds-spec.org/acquisition";
  parse(feed: XMLInterface.XMLFeed): OPDSFeed {
    let namespaces: Array<XMLInterface.XMLNamespace> = feed["$"];
    let atomPrefix: string = namespaceParser.atomPrefix(namespaces);

    let title: string;
    let rawTitle = feed[atomPrefix + "title"];
    if (rawTitle && rawTitle.length > 0) {
      title = rawTitle[0]["_"];
    }

    let links: Array<OPDSLink>;
    let rawLinks = feed[atomPrefix + "link"];
    if (rawLinks) {
      links = rawLinks.map((link) => {
        return linkParser.parse(link);
      });
    } else {
      links = [];
    }

    let entries: Array<OPDSEntry>;
    let rawEntries = feed[atomPrefix + "entry"];
    if (rawEntries) {
      entries = rawEntries.map((entry) => {
        return entryParser.parse(entry, atomPrefix);
      });
    } else {
      entries = [];
    }
    let allEntriesHaveAcquisitionLinks: boolean = entries.every((entry) => {
      return !!entry.links.find((link) => {
        return link.rel === FeedParser.OPDS_ACQUISITION_REL;
      });

    });
    if (allEntriesHaveAcquisitionLinks) {
      return new AcquisitionFeed(title, links);
    } else {
      return new NavigationFeed(title, links);
    }
  }
}