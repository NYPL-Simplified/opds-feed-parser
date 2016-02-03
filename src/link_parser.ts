import OPDSLink from "./opds_link";
import OPDSCatalogRootLink from "./opds_catalog_root_link";
import OPDSFacetLink from "./opds_facet_link";
import SearchLink from "./search_link";
import OPDSAcquisitionLink from "./opds_acquisition_link";
import PriceParser from "./price_parser";
import IndirectAcquisitionParser from "./indirect_acquisition_parser";
import OPDSArtworkLink from "./opds_artwork_link";
import AlternateLink from "./alternate_link";
import OPDSCrawlableLink from "./opds_crawlable_link";
import NamespaceParser from "./namespace_parser";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class LinkParser extends Xml2jsOutputParser<OPDSLink> {
  parse(link: any): OPDSLink {
    let href = this.parseAttribute(link, "href");
    let rel = this.parseAttribute(link, "rel");
    let type = this.parseAttribute(link, "type");
    let title = this.parseAttribute(link, "title");

    if (rel === OPDSCatalogRootLink.REL) {
       return new OPDSCatalogRootLink({ href, type, title });
    } else if (rel === OPDSFacetLink.REL) {
      let opdsPrefix = this.prefixes[NamespaceParser.OPDS_URI];

      let facetGroup = this.parseAttribute(link, opdsPrefix + "facetGroup");
      let activeFacet = (this.parseAttribute(link, opdsPrefix + "activeFacet") === "true");

      let thrPrefix = this.prefixes[NamespaceParser.THR_URI];
      let count = parseInt(this.parseAttribute(link, thrPrefix + "count"), 10);

      return new OPDSFacetLink({ href, type, title, facetGroup, activeFacet, count });
    } else if (rel === SearchLink.REL) {
      let openSearchPrefix = this.prefixes[NamespaceParser.OPEN_SEARCH_URI];

      let totalResults = parseInt(this.parseAttribute(link, openSearchPrefix + "totalResults"), 10);
      let startIndex = parseInt(this.parseAttribute(link, openSearchPrefix + "startIndex"), 10);
      let itemsPerPage = parseInt(this.parseAttribute(link, openSearchPrefix + "itemsPerPage"), 10);

      return new SearchLink({ href, type, title, totalResults, startIndex, itemsPerPage });
    } else if (this.isAcquisitionLinkRel(rel)) {
      let opdsPrefix = this.prefixes[NamespaceParser.OPDS_URI];
      let priceParser = new PriceParser(this.prefixes);
      let prices = this.parseSubtags(link, opdsPrefix + "price", priceParser);
      let indirectAcquisitionParser = new IndirectAcquisitionParser(this.prefixes);
      let indirectAcquisitions = this.parseSubtags(link, opdsPrefix + "indirectAcquisition", indirectAcquisitionParser);

      return new OPDSAcquisitionLink({ href, rel, type, title, prices, indirectAcquisitions });
    } else if (rel === AlternateLink.REL) {
      return new AlternateLink({ href, type, title });
    } else if (this.isArtworkLinkRel(rel)) {
      return new OPDSArtworkLink({ href, rel, type, title });
    } else if (rel === OPDSCrawlableLink.REL) {
      return new OPDSCrawlableLink({ href, rel, type, title });
    } else {
      return new OPDSLink({ href, rel, type, title });
    }
  }

  private isAcquisitionLinkRel(rel) {
    return OPDSAcquisitionLink.RELS.includes(rel);
  }

  private isArtworkLinkRel(rel) {
    return OPDSArtworkLink.RELS.includes(rel);
  }
}