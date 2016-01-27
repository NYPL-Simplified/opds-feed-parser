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

  describe("#atomPrefix", () => {
    it("returns empty string for no prefix", () => {
      let namespaces = {
        "xmlns": {
          "value": NamespaceParser.ATOM_NAMESPACE_URI,
          "local": ""
        }
      };
      let atomPrefix = parser.atomPrefix(namespaces);
      expect(atomPrefix).to.equals("");
    });

    it("returns prefix with colon", () => {
      let namespaces = {
        "xmlns:atom": {
          "value": NamespaceParser.ATOM_NAMESPACE_URI,
          "local": "atom"
        }
      };
      let atomPrefix = parser.atomPrefix(namespaces);
      expect(atomPrefix).to.equals("atom:");
    });
  });
});