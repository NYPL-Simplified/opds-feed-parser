///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSPrice from "../src/opds_price";
import PriceParser from "../src/price_parser";
import chai = require("chai");
let expect = chai.expect;

describe("PriceParser", () => {
  let parser: PriceParser;

  beforeEach(() => {
    let prefixes = Immutable.Map<string, string>();
    parser = new PriceParser(prefixes);
  });

  describe("#parse", () => {
    it("extracts attributes", () => {
      let value =  "1000.00";
      let currencyCode = "USD";
      let price = {
        "$": {
          "currencyCode": { "value": currencyCode }
        },
        "_": value
      };
      let parsedPrice = parser.parse(price);
      expect(parsedPrice.value).to.equals(value);
      expect(parsedPrice.currencyCode).to.equals(currencyCode);
    });
 });
});