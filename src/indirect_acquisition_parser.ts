import OPDSIndirectAcquisition from "./opds_indirect_acquisition";
import Xml2jsOutputParser from "./xml2js_output_parser";
import NamespaceParser from "./namespace_parser";

export default class IndirectAcquisitionParser extends Xml2jsOutputParser<OPDSIndirectAcquisition> {
  parse(element: any): OPDSIndirectAcquisition {
    let parsed = <OPDSIndirectAcquisition>{ type: this.parseAttribute(element, "type") };

    let opdsPrefix = this.prefixes[NamespaceParser.OPDS_URI];
    let tagName = opdsPrefix + "indirectAcquisition";
    if (element[tagName]) {
      parsed.indirectAcquisitions = element[tagName].map(subElement => this.parse(subElement));
    }

    return parsed;
  }
}
