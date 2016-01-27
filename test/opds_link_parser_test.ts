///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import OPDSLinkParser from "../src/opds_link_parser";
import chai = require("chai");
let expect = chai.expect;

describe("OPDSLinkParser", () => {
  let parser: OPDSLinkParser;

  beforeEach(() => {
    parser = new OPDSLinkParser();
  });

  describe("#parse", () => {
    it("extracts link attributes", () => {
      let link = {
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": "test rel"}
        }
      };
      let parsedLink = parser.parse(link);
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals("test rel");
    });
  });
});