import OPDSFeed from "./opds_feed";
import OPDSEntry from "./opds_entry";
import NamespaceParser from "./namespace_parser";
import FeedParser from "./feed_parser";
import EntryParser from "./entry_parser";
import xml2js = require("xml2js");

let xmlParser = new xml2js.Parser({xmlns: true});
let namespaceParser = new NamespaceParser();

export default class OPDSParser {
  parse(s: string): Promise<OPDSFeed | OPDSEntry> {
    return new Promise<OPDSFeed | OPDSEntry>((resolve, reject) => {
      xmlParser.parseString(s, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.feed) {
            let prefixes = namespaceParser.prefixes(result.feed);
            let feedParser = new FeedParser(prefixes);
            let opdsFeed = feedParser.parse(result.feed);
            resolve(opdsFeed);
          } else if (result.entry) {
            let prefixes = namespaceParser.prefixes(result.entry);
            let entryParser = new EntryParser(prefixes);
            let opdsEntry = entryParser.parse(result.entry);
            resolve(opdsEntry);
          } else {
            reject("No feed found");
          }
        }
      });
    });
  }
}
