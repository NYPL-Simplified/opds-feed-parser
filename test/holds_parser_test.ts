import PrefixMap from "../src/prefix_map";
import OPDSHolds from "../src/opds_holds";
import HoldsParser from "../src/holds_parser";
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("HoldsParser", () => {
  let parser: HoldsParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    prefixes[NamespaceParser.OPDS_URI] = "opds:";
    parser = new HoldsParser(prefixes);
  });

  describe("#parse", () => {
    it("extract attributes", () => {
      let holds = {
        $: {
          total: { value: "37" },
          position: { value: "31" },
        }
      };
      let parsed = parser.parse(holds);
      expect(parsed.total).to.equals(37);
      expect(parsed.position).to.equals(31);
    });
  });
});