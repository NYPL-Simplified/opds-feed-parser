import OPDSAvailability from "./opds_availability";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class AvailabilityParser extends Xml2jsOutputParser<OPDSAvailability> {
  parse(element: any): OPDSAvailability {
    let parsed: OPDSAvailability = {
      status: this.parseAttribute(element, "status"),
      since: this.parseAttribute(element, "since"),
      until: this.parseAttribute(element, "until")
    };

    return parsed;
  }
}