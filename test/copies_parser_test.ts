///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
import PrefixMap from "../src/prefix_map";
import OPDSCopies from "../src/opds_copies";
import CopiesParser from "../src/copies_parser";
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("CopiesParser", () => {
  let parser: CopiesParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    prefixes[NamespaceParser.OPDS_URI] = "opds:";
    parser = new CopiesParser(prefixes);
  });

  describe("#parse", () => {
    it("extract attributes", () => {
      let copies = {
        $: {
          total: { value: "13" },
          available: { value: "2" },
        }
      };
      let parsed = parser.parse(copies);
      expect(parsed.total).to.equals(13);
      expect(parsed.available).to.equals(2);
    });
  });
});