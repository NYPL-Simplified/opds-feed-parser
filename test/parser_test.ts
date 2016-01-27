///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import OPDSFeed from "../src/opds_feed";
import NavigationFeed from "../src/navigation_feed";
import AcquisitionFeed from "../src/acquisition_feed";
import Parser from "../src/opds_parser";
import chai = require("chai");
let expect = chai.expect;

describe("Parser", () => {
  let parser: Parser;

  beforeEach(() => {
    parser = new Parser();
  });

  describe("#parse", () => {
    it("raises error when input has no feed", (done) => {
      let opds = "<test></test>";
      let promise: Promise<OPDSFeed> = parser.parse(opds);
      promise.then(() => {
        done("parser did not raise error for input with no feed");
      }).catch((error) => {
        done();
      });
    });

    it("allows foreign markup", (done) => {
      // http://opds-spec.org/specs/opds-catalog-1-1-20110627/#Document_Extensibility
      let opds = "<feed><test /></feed>";
      let promise: Promise<OPDSFeed> = parser.parse(opds);
      promise.then((result) => {
        if (result) {
          done();
        } else {
          done("parse did not return an OPDSFeed");
        }
      }).catch((error) => {
        done(error);
      });
    });

    it("extracts catalog root", (done) => {
      // http://opds-spec.org/specs/opds-catalog-1-1-20110627/#OPDS_Catalog_Root
      let opds = "<feed xmlns:atom=\"http://www.w3.org/2005/Atom\"><atom:link href=\"test\" rel=\"start\" /></feed>";

      let promise: Promise<OPDSFeed> = parser.parse(opds);
      promise.then((result) => {
        expect(result.links.length).to.equals(1);
        expect(result.links[0].href).to.equals("test");
        expect(result.links[0].rel).to.equals("start");
        done();
      }).catch((error) => {
        done(error);
      });
    });

    it("recognizes navigation feed", (done) => {
      // http://opds-spec.org/specs/opds-catalog-1-1-20110627/#Navigation_Feeds
      let opds = "<feed xmlns:atom=\"http://www.w3.org/2005/Atom\"><atom:entry><atom:link href=\"test\" rel=\"start\" /></atom:entry></feed>";
      let promise: Promise<NavigationFeed> = parser.parse(opds);
      promise.then((result) => {
        if (result) {
          expect(result instanceof NavigationFeed).to.be.true;
          done();
        } else {
          done("parser did not return feed");
        }
      }).catch((error) => {
        done(error);
      });
    });

    it("recognizes acquisition feed", (done) => {
      // http://opds-spec.org/specs/opds-catalog-1-1-20110627/#Acquisition_Feeds
      let opds = "<feed xmlns:atom=\"http://www.w3.org/2005/Atom\"><atom:entry><atom:link href=\"test\" rel=\"http://opds-spec.org/acquisition\"/></atom:entry></feed>";
      let promise: Promise<AcquisitionFeed> = parser.parse(opds);
      promise.then((result) => {
        if (result) {
          expect(result instanceof AcquisitionFeed).to.be.true;
          done();
        } else {
          done("parser did not return feed");
        }
      }).catch((error) => {
        done(error);
      });
    });

  });
});