import PrefixMap from "../src/prefix_map";
import OPDSAvailability from "../src/opds_availability";
import AvailabilityParser from "../src/availability_parser";
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("AvailabilityParser", () => {
  let parser: AvailabilityParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    prefixes[NamespaceParser.OPDS_URI] = "opds:";
    parser = new AvailabilityParser(prefixes);
  });

  describe("#parse", () => {
    it("extract attributes", () => {
      let availability = {
        $: {
          status: { value: "reserved" },
          since: { value: "2016-07-26T15:46:19Z" },
          until: { value: "2016-11-02T19:46:27Z" }
        }
      };
      let parsed = parser.parse(availability);
      expect(parsed.status).to.equals("reserved");
      expect(parsed.since).to.equals("2016-07-26T15:46:19Z");
      expect(parsed.until).to.equals("2016-11-02T19:46:27Z");
    });
  });
});