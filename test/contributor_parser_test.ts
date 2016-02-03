///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import ContributorParser from "../src/contributor_parser";
import chai = require("chai");
let expect = chai.expect;


describe("ContributorParser", () => {
  let parser: ContributorParser;

  beforeEach(() => {
    let prefixes = Immutable.Map<string, string>();
    parser = new ContributorParser(prefixes);
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