///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import OPDSLink from "./opds_link";
import OPDSCatalogRootLink from "./opds_catalog_root_link";
import OPDSFacetLink from "./opds_facet_link";
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
      return new OPDSFacetLink(href, type, title);
    } else {
      return new OPDSLink(href, rel, type, title);
    }
  }
}