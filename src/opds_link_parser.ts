import OPDSLink from "../src/opds_link";

export default class OPDSLinkParser {
  parse(link: any): OPDSLink {
    let href = link["$"].href.value;
    let rel = link["$"].rel.value;
    return new OPDSLink(href, rel);
  }
}