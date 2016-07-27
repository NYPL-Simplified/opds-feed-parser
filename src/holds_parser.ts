import OPDSHolds from "./opds_holds";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class HoldsParser extends Xml2jsOutputParser<OPDSHolds> {
  parse(element: any): OPDSHolds {
    let parsed: OPDSHolds = {
      total: parseInt(this.parseAttribute(element, "total")),
      position: parseInt(this.parseAttribute(element, "position")),
    };

    return parsed;
  }
}