///<reference path="../typings/main/ambient/core-js/core-js.d.ts" />
///<reference path="../typings/main/ambient/xml2js/xml2js.d.ts" />

import OPDSFeed from "./opds_feed";
import NamespaceParser from "./namespace_parser";
import FeedParser from "./feed_parser";
import xml2js = require("xml2js");

let xmlParser = new xml2js.Parser({xmlns: true});
let namespaceParser = new NamespaceParser();

export default class OPDSParser {
  parse(s: string): Promise<OPDSFeed> {
    return new Promise<OPDSFeed>((resolve, reject) => {
      xmlParser.parseString(s, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.feed) {
            let prefixes = namespaceParser.prefixes(result.feed);
            let feedParser = new FeedParser(prefixes);
            let opdsFeed = feedParser.parse(result.feed);
            resolve(opdsFeed);
          } else {
            reject("No feed found");
          }
        }
      });
    });
  }
}
