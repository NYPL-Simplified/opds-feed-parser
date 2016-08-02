import OPDSCopies from "./opds_copies";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class CopiesParser extends Xml2jsOutputParser<OPDSCopies> {
  parse(element: any): OPDSCopies {
    let parsed: OPDSCopies = {
      total: parseInt(this.parseAttribute(element, "total")),
      available: parseInt(this.parseAttribute(element, "available")),
    };

    return parsed;
  }
}