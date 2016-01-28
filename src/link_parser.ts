///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSLink from "./opds_link";
import OPDSCatalogRootLink from "./opds_catalog_root_link";
import OPDSFacetLink from "./opds_facet_link";
import SearchLink from "./search_link";
import NamespaceParser from "./namespace_parser";
import XMLInterface = require("./xml_interface");

export default class LinkParser {
  private prefixes: Immutable.Map<string, string>;
  constructor(prefixes: Immutable.Map<string, string>) {
    this.prefixes = prefixes;
  }

  parse(link: XMLInterface.XMLLink): OPDSLink {
    let href = link["$"].href.value;
    let rel = link["$"].rel.value;
    let type: string;
    if (link["$"].type) {
      type = link["$"].type.value;
    }
    let title: string;
    if (link["$"].title) {
      title = link["$"].title.value;
    }

    if (rel === OPDSCatalogRootLink.REL) {
       return new OPDSCatalogRootLink(href, type, title);
    } else if (rel === OPDSFacetLink.REL) {
      let opdsPrefix = this.prefixes[NamespaceParser.OPDS_URI];

      let facetGroup: string;
      if (link["$"][opdsPrefix + "facetGroup"]) {
        facetGroup = link["$"][opdsPrefix + "facetGroup"].value;
      }

      let activeFacet: boolean;
      if (link["$"][opdsPrefix + "activeFacet"]) {
        activeFacet = (link["$"][opdsPrefix + "activeFacet"].value === "true");
      }

      let count: number;
      let thrPrefix = this.prefixes[NamespaceParser.THR_URI];
      if (link["$"][thrPrefix + "count"]) {
        count = parseInt(link["$"][thrPrefix + "count"].value, 10);
      }

      return new OPDSFacetLink(href, type, title, facetGroup, activeFacet, count);
    } else if (rel === SearchLink.REL) {
      let openSearchPrefix = this.prefixes[NamespaceParser.OPEN_SEARCH_URI];

      let totalResults: number;
      if (link["$"][openSearchPrefix + "totalResults"]) {
        totalResults = parseInt(link["$"][openSearchPrefix + "totalResults"].value, 10);
      }

      let startIndex: number;
      if (link["$"][openSearchPrefix + "startIndex"]) {
        startIndex = parseInt(link["$"][openSearchPrefix + "startIndex"].value, 10);
      }

      let itemsPerPage: number;
      if (link["$"][openSearchPrefix + "itemsPerPage"]) {
        itemsPerPage = parseInt(link["$"][openSearchPrefix + "itemsPerPage"].value, 10);
      }

      return new SearchLink(href, type, title, totalResults, startIndex, itemsPerPage);
    } else {
      return new OPDSLink(href, rel, type, title);
    }
  }
}