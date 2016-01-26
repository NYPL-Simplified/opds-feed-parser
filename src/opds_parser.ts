///<reference path="../typings/core-js/core-js.d.ts"/>
///<reference path="../typings/xml2js/xml2js.d.ts"/>
import OPDSFeed from "../src/opds_feed";
import OPDSFeedParser from "../src/opds_feed_parser";
import xml2js = require("xml2js");

var xmlParser = new xml2js.Parser({xmlns: true});
var opdsFeedParser = new OPDSFeedParser();

export default class Parser {
  parse(s: string): Promise<OPDSFeed> {
    return new Promise<OPDSFeed>((resolve, reject) => {
      xmlParser.parseString(s, (err, result) => {
        if (err) {
	  reject(err);
	} else {
	  if (result.feed) {
	    var opdsFeed = opdsFeedParser.parse(result.feed);
	    resolve(opdsFeed);
	  } else {
	    reject("No feed found");
	  }
	}
      });
    });
  }
}
