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
    prefixes[NamespaceParser.DC_URI] = "dc:";
    parser = new EntryParser(prefixes);
  });

  describe("#parse", () => {
    it("extracts id", () => {
      let entry = {
        "atom:id": [{"_": "test id"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.id).to.equals("test id");
    });

    it("extracts updated", () => {
      let entry = {
        "atom:updated": [{"_": "2016-01-01"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.updated).to.equals("2016-01-01");
    });

    it("extracts title", () => {
      let entry = {
        "atom:title": [{"_": "test title"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.title).to.equals("test title");
    });

    it("extracts authors", () => {
      let authors = [{
        "name": [{"_": "test name"}],
        "uri": [{"_": "test uri"}]
      }];
      let entry = {
        "atom:author": authors
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.authors.length).to.equals(1);
      let parsedAuthor = parsedEntry.authors[0];
      expect(parsedAuthor.name).to.equals("test name");
      expect(parsedAuthor.uri).to.equals("test uri");
    });

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

    it("extracts identifiers", () => {
      let identifiers = [{
        "_": "test identifier"
      }];
      let entry = {
        "dc:identifier": identifiers
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.identifiers.length).to.equals(1);
      let parsedIdentifier = parsedEntry.identifiers[0];
      expect(parsedIdentifier).to.equals("test identifier");
    });

    it("extracts issued", () => {
      let entry = {
        "dc:issued": [{"_": "2016-01-01"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.issued).to.equals("2016-01-01");
    });
  });
});