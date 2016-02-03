///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import CategoryParser from "../src/category_parser";
import chai = require("chai");
let expect = chai.expect;


describe("CategoryParser", () => {
  let parser: CategoryParser;

  beforeEach(() => {
    let prefixes = Immutable.Map<string, string>();
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