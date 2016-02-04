///<reference path="../typings/main/ambient/mocha/mocha.d.ts" />
///<reference path="../typings/main/ambient/chai/chai.d.ts" />
///<reference path="../typings/main/ambient/node/node.d.ts" />
import OPDSFeed from "../src/opds_feed";
import {
  NavigationFeed,
  AcquisitionFeed,
  OPDSCatalogRootLink,
  SearchLink,
  OPDSAcquisitionLink,
  OPDSArtworkLink
} from "../src/index";
import OPDSParser from "../src/opds_parser";
import fs = require("fs");
import chai = require("chai");
let expect = chai.expect;

describe("OPDSParser", () => {
  let parser: OPDSParser;

  beforeEach(() => {
    parser = new OPDSParser();
  });

  describe("#parse", () => {
    it("raises error when input has no feed", (done) => {
      let opds = "<test></test>";
      let promise: Promise<OPDSFeed> = parser.parse(opds);
      promise.then(() => {
        done("parser did not raise error for input with no feed");
      }).catch((error) => {
        done();
      });
    });

    it("allows foreign markup", (done) => {
      // http://opds-spec.org/specs/opds-catalog-1-1-20110627/#Document_Extensibility
      let opds = "<feed><test /></feed>";
      let promise: Promise<OPDSFeed> = parser.parse(opds);
      promise.then((result) => {
        if (result) {
          done();
        } else {
          done("parse did not return an OPDSFeed");
        }
      }).catch((error) => {
        done(error);
      });
    });

    it("parses navigation feed from OPDS test catalog", (done) => {
      fs.readFile("test/files/navigation.xml", "utf8", (error, data) => {
        if (error) {
          done(error);
        } else {
          let promise: Promise<OPDSFeed> = parser.parse(data);
          promise.then((result) => {
            expect(result).to.be.an.instanceof(NavigationFeed);
            expect(result).not.to.be.an.instanceof(AcquisitionFeed);
            expect(result.id).to.equals("root.xml");
            expect(result.title).to.equals("Test Catalog Root");
            expect(result.updated).to.equals("2012-10-20T01:11:18Z");

            expect(result.links.length).to.equals(5);
            expect(result.links[0].href).to.equals("root.xml");
            expect(result.links[1]).to.be.an.instanceof(OPDSCatalogRootLink);
            expect(result.links[2]).to.be.an.instanceof(SearchLink);

            expect(result.entries.length).to.equals(6);
            expect(result.entries[0].title).to.equals("First Acquisition feed");
            expect(result.entries[0].id).to.equals("main.xml");
            expect(result.entries[0].updated).to.equals("2012-10-20T01:11:18Z");
            expect(result.entries[0].summary.content).to.equals("Basic acquisition feed");
            expect(result.entries[0].links.length).to.equals(1);
            expect(result.entries[0].links[0].type).to.equals("application/atom+xml; profile=opds-catalog; kind=acquisition");
            expect(result.entries[3].title).to.equals("Link: Recommended");
            expect(result.entries[5].id).to.equals("popular.xml");
          }).then(done, done);
        }
      });
    });

    it("parses acquisition feed from OPDS test catalog", (done) => {
      fs.readFile("test/files/acquisition.xml", "utf8", (error, data) => {
        if (error) {
          done(error);
        } else {
          let promise: Promise<OPDSFeed> = parser.parse(data);
          promise.then((result) => {
            expect(result).to.be.an.instanceof(AcquisitionFeed);
            expect(result).not.to.be.an.instanceof(NavigationFeed);
            expect(result.id).to.equals("main.xml");
            expect(result.title).to.equals("First Acquisition Feed");
            expect(result.updated).to.equals("2012-10-20T01:11:18Z");
            expect(result.search.totalResults).to.equals(18);

            expect(result.links.length).to.equals(4);
            expect(result.links[1].href).to.equals("../root.xml");
            expect(result.links[1]).to.be.an.instanceof(OPDSCatalogRootLink);
            expect(result.links[2]).to.be.an.instanceof(SearchLink);

            expect(result.entries.length).to.equals(17);
            expect(result.entries[0].title).to.equals("Pride and Prejudice");
            expect(result.entries[0].id).to.equals("http://feedbooks.github.io/test/1");
            expect(result.entries[0].authors.length).to.equals(1);
            expect(result.entries[0].authors[0].name).to.equals("Jane Austen");
            expect(result.entries[0].updated).to.equals("2012-10-12T17:43:18Z");
            expect(result.entries[0].summary.content).to.contain("the story of Mrs. Bennet's attempts to marry off her five daughters");
            expect(result.entries[0].categories.length).to.equals(2);
            expect(result.entries[0].categories[0].term).to.equals("FBFIC000000");
            expect(result.entries[0].categories[0].label).to.equals("Fiction");

            expect(result.entries[0].links.length).to.equals(4);
            expect(result.entries[0].links[0]).to.be.an.instanceof(OPDSAcquisitionLink);
            expect(result.entries[0].links[0].href).to.equals("http://www.feedbooks.com/book/52.epub");
            expect(result.entries[0].links[1]).to.be.an.instanceof(OPDSArtworkLink);
          }).then(done, done);
        }
      });
    });
  });
});