///<reference path="../typings/core-js/core-js.d.ts"/>
///<reference path="../typings/xml2js/xml2js.d.ts"/>
import OPDSFeed from "./opds_feed";
import FeedParser from "./feed_parser";
import xml2js = require("xml2js");

let xmlParser = new xml2js.Parser({xmlns: true});
let feedParser = new FeedParser();

export default class OPDSParser {
  parse(s: string): Promise<OPDSFeed> {
    return new Promise<OPDSFeed>((resolve, reject) => {
      xmlParser.parseString(s, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.feed) {
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
