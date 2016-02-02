///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import LinkParser from "../src/link_parser";
import NamespaceParser from "../src/namespace_parser";
import OPDSCatalogRootLink from "../src/opds_catalog_root_link";
import OPDSFacetLink from "../src/opds_facet_link";
import SearchLink from "../src/search_link";
import AlternateLink from "../src/alternate_link";
import OPDSAcquisitionLink from "../src/opds_acquisition_link";
import OPDSArtworkLink from "../src/opds_artwork_link";
import chai = require("chai");
let expect = chai.expect;

describe("LinkParser", () => {
  let parser: LinkParser;

  beforeEach(() => {
    let prefixes = Immutable.Map<string, string>();
    prefixes[NamespaceParser.OPDS_URI] = "opds:";
    prefixes[NamespaceParser.THR_URI] = "thr:";
    prefixes[NamespaceParser.OPEN_SEARCH_URI] = "opensearch:";
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
          "rel": {"value": OPDSFacetLink.REL},
          "opds:facetGroup": {"value": "test facet group"},
          "opds:activeFacet": {"value": "false"},
          "thr:count": {"value": "57"}
        }
      };
      let parsedLink = <OPDSFacetLink>parser.parse(link);
      expect(parsedLink instanceof OPDSFacetLink).to.be.true;
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(OPDSFacetLink.REL);
      expect(parsedLink.facetGroup).to.equals("test facet group");
      expect(parsedLink.activeFacet).to.be.false;
      expect(parsedLink.count).to.equals(57);
    });

    it("extracts search link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": SearchLink.REL},
          "opensearch:totalResults": {"value": "276"},
          "opensearch:itemsPerPage": {"value": "20"},
          "opensearch:startIndex": {"value": "45"}
        }
      };
      let parsedLink = <SearchLink>parser.parse(link);
      expect(parsedLink instanceof SearchLink).to.be.true;
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(SearchLink.REL);
      expect(parsedLink.totalResults).to.equals(276);
      expect(parsedLink.itemsPerPage).to.equals(20);
      expect(parsedLink.startIndex).to.equals(45);
    });

    it("extracts acquisition links", () => {
      OPDSAcquisitionLink.RELS.forEach(rel => {
        let link = {
          "$": {
            "href": {"value": "test href"},
            "rel": {"value": rel}
          }
        };
        let parsedLink = parser.parse(link);
        expect(parsedLink).to.be.an.instanceof(OPDSAcquisitionLink);
        expect(parsedLink.href).to.equals("test href");
        expect(parsedLink.rel).to.equals(rel);
      });
    });

    it("extracts prices for acquisition links", () => {
      let value =  "1000.00";
      let currencyCode = "USD";
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSAcquisitionLink.BUY_REL}
        },
        "opds:price": [
          {
            "$": {
              "currencyCode": { "value": currencyCode }
            },
            "_": value
          }
        ]
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(OPDSAcquisitionLink);
      let castParsedLink = <OPDSAcquisitionLink>parsedLink;
      expect(castParsedLink.prices.length).to.equals(1);
    });

    it("extracts nested indirect acquisitions for acquisition links", () => {
      let type1 = "vnd.adobe/adept+xml";
      let type2 = "application/epub+zip";
      let type3 = "application/zip";
      let type4 = "application/pdf";
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSAcquisitionLink.BUY_REL}
        },
        "opds:indirectAcquisition": [
          {
            "$": {
              "type": { "value": type1 }
            },
            "opds:indirectAcquisition": [
              {
                "$": {
                  "type": { "value": type2 }
                }
              }
            ]
          },
          {
            "$": {
              "type": { "value": type3 }
            },
            "opds:indirectAcquisition": [
              {
                "$": {
                  "type": { "value": type4 }
                }
              }
            ]
          }
        ]
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(OPDSAcquisitionLink);
      let castParsedLink = <OPDSAcquisitionLink>parsedLink;
      expect(castParsedLink.indirectAcquisitions[0].type).to.equals(type1);
      expect(castParsedLink.indirectAcquisitions[0].indirectAcquisitions[0].type).to.equals(type2);
      expect(castParsedLink.indirectAcquisitions[1].type).to.equals(type3);
      expect(castParsedLink.indirectAcquisitions[1].indirectAcquisitions[0].type).to.equals(type4);
    });

    it("extracts artwork links", () => {
      OPDSArtworkLink.RELS.forEach(rel => {
        let link = {
          "$": {
            "href": {"value": "test href"},
            "rel": {"value": rel}
          }
        };
        let parsedLink = parser.parse(link);
        expect(parsedLink).to.be.an.instanceof(OPDSArtworkLink);
        expect(parsedLink.href).to.equals("test href");
        expect(parsedLink.rel).to.equals(rel);
      });
    });

    it("extracts alternate link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": AlternateLink.REL}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink instanceof AlternateLink).to.be.true;
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(AlternateLink.REL);
    });
  });
});