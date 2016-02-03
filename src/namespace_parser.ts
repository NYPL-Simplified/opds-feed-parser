import PrefixMap from "./prefix_map";
import XMLInterface = require("./xml_interface");

export default class NamespaceParser {
  static ATOM_URI = "http://www.w3.org/2005/Atom";
  static OPDS_URI = "http://opds-spec.org/2010/catalog";
  static DC_URI = "http://purl.org/dc/terms/";
  static THR_URI = "http://purl.org/syndication/thread/1.0";
  static OPEN_SEARCH_URI = "http://a9.com/-/spec/opensearch/1.1/";
  static FH_URI = "http://purl.org/syndication/history/1.0";
  static URIS = [
    NamespaceParser.ATOM_URI,
    NamespaceParser.OPDS_URI,
    NamespaceParser.DC_URI,
    NamespaceParser.THR_URI,
    NamespaceParser.OPEN_SEARCH_URI,
    NamespaceParser.FH_URI
  ];
  prefixes(feed: any): PrefixMap {
    let prefixMap: PrefixMap = {};
    let rawNamespaces = Object.keys(feed["$"] || {}).map((k) => feed["$"][k]);
    NamespaceParser.URIS.forEach((uri) => {
      let namespace = rawNamespaces.find((ns) => {
        return ns.value === uri;
      });
      let prefix = "";
      if (namespace) {
        prefix = namespace.local;
        if (prefix.length > 0) {
          prefix += ":";
        }
      }
      prefixMap[uri] = prefix;
    });
    return prefixMap;
  }
}