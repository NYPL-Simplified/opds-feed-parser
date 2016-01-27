///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import OPDSEntryParser from "../src/opds_entry_parser";
import chai = require("chai");
let expect = chai.expect;

describe("OPDSEntryParser", () => {
  let parser: OPDSEntryParser;

  beforeEach(() => {
    parser = new OPDSEntryParser();
  });

  describe("#parse", () => {
    it("extracts links", () => {
      let links = [{
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": "test rel"}
        }
      }];
      let entry = {
        "atom:link": links
      };
      let parsedEntry = parser.parse(entry, "atom:");
      expect(parsedEntry.links.length).to.equals(1);
      let parsedLink = parsedEntry.links[0];
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals("test rel");
    });
  });
});