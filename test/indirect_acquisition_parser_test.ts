///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
import PrefixMap from "../src/prefix_map";
import OPDSIndirectAcquisition from "../src/opds_indirect_acquisition";
import IndirectAcquisitionParser from "../src/indirect_acquisition_parser";
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("IndirectAcquisitionParser", () => {
  let parser: IndirectAcquisitionParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    prefixes[NamespaceParser.OPDS_URI] = "opds:";
    parser = new IndirectAcquisitionParser(prefixes);
  });

  describe("#parse", () => {
    it("extract attributes", () => {
      let type1 = "application/zip";
      let type2 = "application/epub+zip";
      let type3 = "application/pdf";
      let indirectAcquisition = {
        "$": {
          "type": { "value": type1 }
        },
        "opds:indirectAcquisition": [
          {
            "$": {
              "type": { "value": type2 }
            }
          },
          {
            "$": {
              "type": { "value": type3 }
            }
          }
        ]
      };
      let parsedIndirectAcquisition = parser.parse(indirectAcquisition);
      expect(parsedIndirectAcquisition.type).to.equals(type1);
      expect(parsedIndirectAcquisition.indirectAcquisitions.length).to.equals(2);
      expect(parsedIndirectAcquisition.indirectAcquisitions[0].type).to.equals(type2);
      expect(parsedIndirectAcquisition.indirectAcquisitions[1].type).to.equals(type3);
    });
  });
});