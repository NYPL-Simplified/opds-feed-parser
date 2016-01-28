///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import FeedParser from "../src/feed_parser";
import AcquisitionFeed from "../src/acquisition_feed";
import NavigationFeed from "../src/navigation_feed";
import NamespaceParser from "../src/namespace_parser";
import OPDSAcquisitionLink from "../src/opds_acquisition_link";
import chai = require("chai");
let expect = chai.expect;

describe("FeedParser", () => {
  let parser: FeedParser;

  beforeEach(() => {
    parser = new FeedParser();
  });

  describe("#parse", () => {
    it("extracts entries", () => {
      let entries = [{
        "atom:id": [{"_": "test id"}],
        "atom:title": [{"_": "test title"}]
      }];

      let feed = {
        "$": {
          "xmlns:atom": {
            "value": NamespaceParser.ATOM_URI,
            "local": "atom"
          }
        },
        "atom:entry": entries
      };
      let parsedFeed = parser.parse(feed);
      expect(parsedFeed.entries.length).to.equals(1);
      let parsedEntry = parsedFeed.entries[0];
      expect(parsedEntry.title).to.equals("test title");
      expect(parsedEntry.id).to.equals("test id");
    });

    it("extracts links", () => {
      let links = [{
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": "test rel"}
        }
      }];
      let feed = {
        "$": {
          "xmlns:atom": {
            "value": NamespaceParser.ATOM_URI,
            "local": "atom"
          }
        },
        "atom:link": links
      };
      let parsedFeed = parser.parse(feed);
      expect(parsedFeed.links.length).to.equals(1);
      let parsedLink = parsedFeed.links[0];
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals("test rel");
    });

    it("extracts title", () => {
      let title = {
        "_": "test title"
      };
      let feed = {
        "$": {
          "xmlns:atom": {
            "value": NamespaceParser.ATOM_URI,
            "local": "atom"
          }
        },
        "atom:title": [title]
      };
      let parsedFeed = parser.parse(feed);
      expect(parsedFeed.title).to.equals("test title");
    });

    it("recognizes navigation feed", () => {
      let links = [{
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": "test rel"}
        }
      }];
      let entry = {
        "atom:link": links
      };
      let feed = {
        "$": {
          "xmlns:atom": {
            "value": NamespaceParser.ATOM_URI,
            "local": "atom"
          }
        },
        "atom:entry": [entry],
      };
      let parsedFeed = parser.parse(feed);
      expect(parsedFeed instanceof NavigationFeed).to.be.true;
      expect(parsedFeed instanceof AcquisitionFeed).to.be.false;
    });

    it("recognizes acquisition feed", () => {
      let links = [{
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": OPDSAcquisitionLink.REL}
        }
      }];
      let entry = {
        "atom:link": links
      };
      let feed = {
        "$": {
          "xmlns:atom": {
            "value": NamespaceParser.ATOM_URI,
            "local": "atom"
          }
        },
        "atom:entry": [entry],
      };
      let parsedFeed = parser.parse(feed);
      expect(parsedFeed instanceof AcquisitionFeed).to.be.true;
      expect(parsedFeed instanceof NavigationFeed).to.be.false;
    });
  });
});