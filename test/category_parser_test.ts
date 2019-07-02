import PrefixMap from "../src/prefix_map";
import CategoryParser from "../src/category_parser";
import chai = require("chai");
let expect = chai.expect;


describe("CategoryParser", () => {
  let parser: CategoryParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    parser = new CategoryParser(prefixes);
  });

  describe("#parse", () => {
    it("extracts attributes", () => {
      let category = {
        "$": {
          "term": {"value": "test term"},
          "scheme": {"value": "test scheme"},
          "label": {"value": "test label"}
        }
      };
      let parsedCategory = parser.parse(category);
      expect(parsedCategory.term).to.equals("test term");
      expect(parsedCategory.scheme).to.equals("test scheme");
      expect(parsedCategory.label).to.equals("test label");
    });
 });
});