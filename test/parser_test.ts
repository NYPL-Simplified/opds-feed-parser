///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import Parser from "../src/parser";
import chai = require("chai");
var expect = chai.expect;

describe("Parser", () => {
  var parser: Parser;
  
  beforeEach(() => {
    parser = new Parser();
  });

  describe("#parse", () => {
    it("should parse simple xml", (done) => {
      var promise: Promise<any> = parser.parse('<root>Hello</root>');
      promise.then((result) => {
        expect(result.root).to.equals("Hello");
	done();
      }).catch((error) => {
        done(error);
      });
    });
  });
});