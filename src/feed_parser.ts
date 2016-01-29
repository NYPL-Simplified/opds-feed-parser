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
import Xml2jsOutputParser from "./xml2js_output_parser";
import XMLInterface = require("./xml_interface");

export default class FeedParser extends Xml2jsOutputParser<OPDSFeed> {
  parse(feed: any): OPDSFeed {
    let atomPrefix = this.prefixes[NamespaceParser.ATOM_URI];

    let linkParser = new LinkParser(this.prefixes);
    let entryParser = new EntryParser(this.prefixes);

    let title = this.parseSubtagContent(feed, atomPrefix + "title");
    let links = this.parseSubtags(feed, atomPrefix + "link", linkParser);
    let entries = this.parseSubtags(feed, atomPrefix + "entry", entryParser);

    let allEntriesHaveAcquisitionLinks: boolean = entries.every((entry) => {
      return !!entry.links.find((link) => {
        return (link instanceof OPDSAcquisitionLink);
      });

    });
    if (allEntriesHaveAcquisitionLinks) {
      return new AcquisitionFeed(title, entries, links);
    } else {
      return new NavigationFeed(title, entries, links);
    }
  }
}