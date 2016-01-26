///<reference path="../typings/underscore/underscore.d.ts"/>
import _ = require("underscore");
import OPDSFeed from "./opds_feed";
import OPDSLinkParser from "./opds_link_parser";
import XMLInterface = require("./xml_interface");

let opdsLinkParser = new OPDSLinkParser();

export default class OPDSFeedParser {
  parse(feed: XMLInterface.XMLFeed): OPDSFeed {
    let namespaces = feed["$"];
    let atomNamespace = _.find(_.values(namespaces), (ns) => {
      return ns.value === "http://www.w3.org/2005/Atom";
    });
    let atomPrefix = "";
    if (!_.isUndefined(atomNamespace)) {
      atomPrefix = atomNamespace.local;
      if (atomPrefix.length > 0) {
        atomPrefix += ":";
      }
    }

    let links = _.map(feed[atomPrefix + "link"], (link) => {
      return opdsLinkParser.parse(link);
    });

    return new OPDSFeed(links);
  }
}