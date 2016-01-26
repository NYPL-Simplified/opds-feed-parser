import OPDSLink from "../src/opds_link";

export default class OPDSLinkParser {
  parse(link: any) : OPDSLink {
    var href = link['$'].href.value;
    var rel = link['$'].rel.value;
    return new OPDSLink(href, rel);
  }
}