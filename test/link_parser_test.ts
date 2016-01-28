///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import LinkParser from "../src/link_parser";
import NamespaceParser from "../src/namespace_parser";
import OPDSCatalogRootLink from "../src/opds_catalog_root_link";
import OPDSFacetLink from "../src/opds_facet_link";
import chai = require("chai");
let expect = chai.expect;

describe("LinkParser", () => {
  let parser: LinkParser;

  beforeEach(() => {
    let prefixes = Immutable.Map<string, string>();
    prefixes[NamespaceParser.ATOM_URI] = "atom:";
    parser = new LinkParser(prefixes);
  });

  describe("#parse", () => {
    it("extracts link attributes", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": "test rel"},
          "type": {"value": "test type"},
          "title": {"value": "test title"}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals("test rel");
      expect(parsedLink.type).to.equals("test type");
      expect(parsedLink.title).to.equals("test title");
    });

    it("allows no type and title", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": "test rel"},
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals("test rel");
      expect(parsedLink.type).to.be.undefined;
      expect(parsedLink.title).to.be.undefined;
    });

    it("extracts catalog root link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSCatalogRootLink.REL}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink instanceof OPDSCatalogRootLink).to.be.true;
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(OPDSCatalogRootLink.REL);
    });

    it("extracts facet link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSFacetLink.REL}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink instanceof OPDSFacetLink).to.be.true;
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(OPDSFacetLink.REL);
    });
  });
});