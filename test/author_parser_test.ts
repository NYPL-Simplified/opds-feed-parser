///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import AuthorParser from "../src/author_parser";
import chai = require("chai");
let expect = chai.expect;


describe("AuthorParser", () => {
  let parser: AuthorParser;

  beforeEach(() => {
    let prefixes = Immutable.Map<string, string>();
    parser = new AuthorParser(prefixes);
  });

  describe("#parse", () => {
    it("extracts name", () => {
      let author = {
        "name": [{"_": "test name"}],
      };
      let parsedAuthor = parser.parse(author);
      expect(parsedAuthor.name).to.equals("test name");
    });

    it("extracts uri", () => {
      let author = {
        "uri": [{"_": "test uri"}],
      };
      let parsedAuthor = parser.parse(author);
      expect(parsedAuthor.uri).to.equals("test uri");
    });
 });
});