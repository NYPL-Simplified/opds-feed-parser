import OPDSLink from "./opds_link";
import XMLInterface = require("./xml_interface");

export default class LinkParser {
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
    return new OPDSLink(href, rel, type, title);
  }
}