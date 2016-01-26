///<reference path="../typings/underscore/underscore.d.ts"/>
import _ = require("underscore");
import OPDSFeed from "../src/opds_feed";
import OPDSLinkParser from "../src/opds_link_parser";

var opdsLinkParser = new OPDSLinkParser();

export default class OPDSFeedParser {
  parse(feed: any) : OPDSFeed {
    var namespaces = feed['$'];
    var atomNamespace = _.find(_.values(namespaces), (ns) => {
      return ns.value === 'http://www.w3.org/2005/Atom';
    });
    var atomPrefix = "";
    if (!_.isUndefined(atomNamespace)) {
      atomPrefix = atomNamespace.local;
      if (atomPrefix.length > 0) {
        atomPrefix += ":";
      }
    }
    var links = _.map(feed[atomPrefix + 'link'], (link) => {
      return opdsLinkParser.parse(link);
    });

    return new OPDSFeed(links);
  }
}