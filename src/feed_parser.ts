///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSFeed from "./opds_feed";
import OPDSLink from "./opds_link";
import OPDSAcquisitionLink from "./opds_acquisition_link";
import OPDSEntry from "./opds_entry";
import NavigationFeed from "./navigation_feed";
import AcquisitionFeed from "./acquisition_feed";
import LinkParser from "./link_parser";
import EntryParser from "./entry_parser";
import NamespaceParser from "./namespace_parser";
import XMLInterface = require("./xml_interface");

let namespaceParser = new NamespaceParser();

export default class FeedParser {
  parse(feed: XMLInterface.XMLFeed): OPDSFeed {
    let namespaces: Array<XMLInterface.XMLNamespace> = feed["$"];
    let prefixes: Immutable.Map<string, string> = namespaceParser.prefixes(namespaces);
    let atomPrefix = prefixes[NamespaceParser.ATOM_URI];

    let linkParser = new LinkParser(prefixes);
    let entryParser = new EntryParser(prefixes);

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
        return entryParser.parse(entry);
      });
    } else {
      entries = [];
    }
    let allEntriesHaveAcquisitionLinks: boolean = entries.every((entry) => {
      return !!entry.links.find((link) => {
        return (link instanceof OPDSAcquisitionLink);
      });

    });
    if (allEntriesHaveAcquisitionLinks) {
      return new AcquisitionFeed(title, links);
    } else {
      return new NavigationFeed(title, links);
    }
  }
}