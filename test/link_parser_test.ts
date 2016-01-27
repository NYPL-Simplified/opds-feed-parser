///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import LinkParser from "../src/link_parser";
import chai = require("chai");
let expect = chai.expect;

describe("LinkParser", () => {
  let parser: LinkParser;

  beforeEach(() => {
    parser = new LinkParser();
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
  });
});