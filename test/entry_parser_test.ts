///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import EntryParser from "../src/entry_parser";
import NamespaceParser from "../src/namespace_parser";
import AlternateLink from "../src/alternate_link";
import CompleteEntryLink from "../src/complete_entry_link";
import PartialOPDSEntry from "../src/partial_opds_entry";
import OPDSEntry from "../src/opds_entry";
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

    it("extracts categories", () => {
      let categories = [{
        "$": {
          "term": {"value": "test term"},
          "scheme":  {"value": "test scheme"},
          "label": {"value": "test label"}
        }
      }];
      let entry = {
        "atom:category": categories
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.categories.length).to.equals(1);
      let parsedCategory = parsedEntry.categories[0];
      expect(parsedCategory.term).to.equals("test term");
      expect(parsedCategory.scheme).to.equals("test scheme");
      expect(parsedCategory.label).to.equals("test label");
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

    it("extracts language", () => {
      let entry = {
        "dc:language": [{"_": "it"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.language).to.equals("it");
    });

    it("extracts rights", () => {
      let entry = {
        "atom:rights": [{"_": "test rights"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.rights).to.equals("test rights");
    });

    it("extracts summary from atom:summary", () => {
      let entry = {
        "atom:summary": [{"_": "test summary"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.summary.content).to.equals("test summary");
      expect(parsedEntry.summary.link).to.be.undefined;
    });

    it("extracts summary content from atom:content", () => {
      let entry = {
        "atom:content": [{"_": "test summary"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.summary.content).to.equals("test summary");
      expect(parsedEntry.summary.link).to.be.undefined;
    });

    it("extracts summary link from atom:content", () => {
      let entry = {
        "atom:content": [{
          "$": {
            "src": {"value": "test summary link"}
          }
        }]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.summary.link).to.equals("test summary link");
      expect(parsedEntry.summary.content).to.be.undefined;
    });

    it("extracts contributors", () => {
      let contributors = [{
        "name": [{"_": "test name"}],
        "uri": [{"_": "test uri"}]
      }];
      let entry = {
        "atom:contributor": contributors
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.contributors.length).to.equals(1);
      let parsedContributor = parsedEntry.contributors[0];
      expect(parsedContributor.name).to.equals("test name");
      expect(parsedContributor.uri).to.equals("test uri");
    });

    it("extracts published", () => {
      let entry = {
        "atom:published": [{"_": "2016-01-01"}]
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry.published).to.equals("2016-01-01");
    });

    it("extracts partial entry", () => {
      let links = [{
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": AlternateLink.REL},
          "type": {"value": CompleteEntryLink.TYPE}
        }
      }];
      let entry = {
        "atom:link": links
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry).to.be.an.instanceof(PartialOPDSEntry);
      expect(parsedEntry.links.length).to.equals(1);
    });

    it("extracts full entry", () => {
      let links = [{
        "$": {
          "href": {"value": "test href"},
          "rel":  {"value": AlternateLink.REL}
        }
      }];
      let entry = {
        "atom:link": links
      };
      let parsedEntry = parser.parse(entry);
      expect(parsedEntry).to.be.an.instanceof(OPDSEntry);
      expect(parsedEntry).not.to.be.an.instanceof(PartialOPDSEntry);
    });
  });
});