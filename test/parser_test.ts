///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import OPDSFeed from "../src/opds_feed";
import Parser from "../src/opds_parser";
import chai = require("chai");
var expect = chai.expect;

describe("Parser", () => {
  var parser: Parser;
  
  beforeEach(() => {
    parser = new Parser();
  });

  describe("#parse", () => {
    it("allows foreign markup", () => {
      // http://opds-spec.org/specs/opds-catalog-1-1-20110627/#Document_Extensibility
      throw new Error("not implemented");
    });

    it("extracts catalog root", (done) => {
      // http://opds-spec.org/specs/opds-catalog-1-1-20110627/#OPDS_Catalog_Root
      var opds = '<feed xmlns:atom="http://www.w3.org/2005/Atom"><atom:link href="test" rel="start" /></feed>'
      
      var promise: Promise<OPDSFeed> = parser.parse(opds);
      promise.then((result) => {
        expect(result.links.length).to.equals(1);
	expect(result.links[0].href).to.equals("test");
	expect(result.links[0].rel).to.equals("start");
	done();
      }).catch((error) => {
        done(error);
      });
    });

  });
});