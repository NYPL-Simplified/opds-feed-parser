///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("NamespaceParser", () => {
  let parser: NamespaceParser;

  beforeEach(() => {
    parser = new NamespaceParser();
  });

  describe("#prefixes", () => {
    it("returns empty string for no prefix", () => {
      let namespaces = {
        "xmlns": {
          "value": NamespaceParser.ATOM_URI,
          "local": ""
        }
      };
      let prefixes = parser.prefixes(namespaces);
      let atomPrefix = prefixes[NamespaceParser.ATOM_URI];
      expect(atomPrefix).to.equals("");
    });

    it("returns prefix with colon", () => {
      let namespaces = {
        "xmlns:atom": {
          "value": NamespaceParser.ATOM_URI,
          "local": "atom"
        }
      };
      let prefixes = parser.prefixes(namespaces);
      let atomPrefix = prefixes[NamespaceParser.ATOM_URI];
      expect(atomPrefix).to.equals("atom:");
    });
  });
});