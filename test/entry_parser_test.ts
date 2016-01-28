///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import EntryParser from "../src/entry_parser";
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("EntryParser", () => {
  let parser: EntryParser;

  beforeEach(() => {
    let prefixes = Immutable.Map<string, string>();
    prefixes[NamespaceParser.ATOM_URI] = "atom:";
    parser = new EntryParser(prefixes);
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
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.links.length).to.equals(1);
      let parsedLink = parsedEntry.links[0];
      expect(parsedLink.href).to.equals("test href");
      expect(parsedLink.rel).to.equals("test rel");
    });
  });
});