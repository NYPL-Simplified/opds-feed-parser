///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
import PrefixMap from "../src/prefix_map";
import LinkParser from "../src/link_parser";
import NamespaceParser from "../src/namespace_parser";
import OPDSCatalogRootLink from "../src/opds_catalog_root_link";
import OPDSFacetLink from "../src/opds_facet_link";
import SearchLink from "../src/search_link";
import AlternateLink from "../src/alternate_link";
import CompleteEntryLink from "../src/complete_entry_link";
import OPDSAcquisitionLink from "../src/opds_acquisition_link";
import OPDSArtworkLink from "../src/opds_artwork_link";
import OPDSCrawlableLink from "../src/opds_crawlable_link";
import OPDSCollectionLink from "../src/opds_collection_link";
import OPDSShelfLink from "../src/opds_shelf_link";
import AvailabilityParser from "../src/availability_parser";
import HoldsParser from "../src/holds_parser";
import CopiesParser from "../src/copies_parser";
import chai = require("chai");
let expect = chai.expect;

describe("LinkParser", () => {
  let parser: LinkParser;
  let prefixes: PrefixMap;

  beforeEach(() => {
    prefixes = {
      [NamespaceParser.OPDS_URI]: "opds:",
      [NamespaceParser.THR_URI]: "thr:"
    };
    parser = new LinkParser(prefixes);
  });

  describe("#parse", () => {
    it("extracts link attributes", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": "test rel"},
          "type": {"value": "test type"},
          "title": {"value": "test title"},
          "role": {"value": "test role"}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals("test rel");
      expect(parsedLink.type).to.equals("test type");
      expect(parsedLink.title).to.equals("test title");
      expect(parsedLink.role).to.equals("test role");
    });

    it("allows no type, title, and role", () => {
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
      expect(parsedLink.role).to.be.undefined;
    });

    it("extracts catalog root link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSCatalogRootLink.REL}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(OPDSCatalogRootLink);
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
      expect(parsedLink).to.be.an.instanceof(OPDSFacetLink);
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
        }
      };
      let parsedLink = <SearchLink>parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(SearchLink);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(SearchLink.REL);
    });

    it("extracts acquisition link", () => {
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

    it("extracts prices for acquisition link", () => {
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

    it("extracts nested indirect acquisition for acquisition link", () => {
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

    it("extracts availability, holds, copies for acquisition link", () => {
      let link = {
        $: {
          href: { value: "test href" },
          rel: { value: OPDSAcquisitionLink.BORROW_REL }
        },
        "opds:availability": [
          {
            $: {
              status: { value: "unavailable" },
              until: { value: "2016-11-02T19:46:27Z" }
            }
          }
        ],
        "opds:holds": [
          {
            $: {
              total: { value: "29" },
              position: { value: "11" }
            }
          }
        ],
        "opds:copies": [
          {
            $: {
              total: { value: "7" },
              available: { value: "0" }
            }
          }
        ]
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(OPDSAcquisitionLink);
      let castParsedLink = <OPDSAcquisitionLink>parsedLink;
      expect(castParsedLink.availability).to.deep.equal(
        new AvailabilityParser(prefixes).parse(link["opds:availability"][0])
      );
      expect(castParsedLink.holds).to.deep.equal(
        new HoldsParser(prefixes).parse(link["opds:holds"][0])
      );
      expect(castParsedLink.copies).to.deep.equal(
        new CopiesParser(prefixes).parse(link["opds:copies"][0])
      );
    });

    it("extracts artwork link", () => {
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
      expect(parsedLink).to.be.an.instanceof(AlternateLink);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(AlternateLink.REL);
    });

    it("extracts complete entry link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": AlternateLink.REL},
          "type": {"value": CompleteEntryLink.TYPE}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(CompleteEntryLink);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(AlternateLink.REL);
      expect(parsedLink.type).to.equals(CompleteEntryLink.TYPE);
    });

    it("extracts crawlable link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSCrawlableLink.REL}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(OPDSCrawlableLink);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(OPDSCrawlableLink.REL);
    });

    it("extracts collection link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSCollectionLink.REL},
          "title": {"value": "test title"}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(OPDSCollectionLink);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.title).to.equals("test title");
      expect(parsedLink.rel).to.equals(OPDSCollectionLink.REL);
    });

    it("extracts shelf link", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel": {"value": OPDSShelfLink.REL}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink).to.be.an.instanceof(OPDSShelfLink);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals(OPDSShelfLink.REL);
    });
  });
});