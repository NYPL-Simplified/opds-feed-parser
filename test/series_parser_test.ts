///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
import PrefixMap from "../src/prefix_map";
import Series from "../src/series";
import SeriesParser from "../src/series_parser";
import NamespaceParser from "../src/namespace_parser";
import chai = require("chai");
let expect = chai.expect;

describe("SeriesParser", () => {
  let parser: SeriesParser;

  beforeEach(() => {
    let prefixes: PrefixMap = {};
    prefixes[NamespaceParser.SCHEMA_URI] = "schema:";
    parser = new SeriesParser(prefixes);
  });

  describe("#parse", () => {
    it("extracts attributes", () => {
      let series = {
        $: {
          name: { value: "series name" },
          "schema:position": { value: 5 }
        }
      };
      let parsed = parser.parse(series);
      expect(parsed.name).to.equals("series name");
      expect(parsed.position).to.equals(5);
    });
  });
});