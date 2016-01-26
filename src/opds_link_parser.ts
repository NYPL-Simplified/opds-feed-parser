import OPDSLink from "./opds_link";
import XMLInterface = require("./xml_interface");

export default class OPDSLinkParser {
  parse(link: XMLInterface.XMLLink): OPDSLink {
    let href = link["$"].href.value;
    let rel = link["$"].rel.value;
    return new OPDSLink(href, rel);
  }
}