///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import FeedParser from "../src/feed_parser";
import AcquisitionFeed from "../src/acquisition_feed";
import NavigationFeed from "../src/navigation_feed";
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("FeedParser", () => {
  let parser: FeedParser;

  beforeEach(() => {
    parser = new FeedParser();
  });

  describe("#parse", () => {
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
            "value": NamespaceParser.ATOM_NAMESPACE_URI,
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
            "value": NamespaceParser.ATOM_NAMESPACE_URI,
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
          "rel":  {"value": FeedParser.OPDS_ACQUISITION_REL}
        }
      }];
      let entry = {
        "atom:link": links
      };
      let feed = {
        "$": {
          "xmlns:atom": {
            "value": NamespaceParser.ATOM_NAMESPACE_URI,
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