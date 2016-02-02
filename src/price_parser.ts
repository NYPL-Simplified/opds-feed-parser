import OPDSPrice from "./opds_price";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class PriceParcer extends Xml2jsOutputParser<OPDSPrice> {
  parse(link: any): OPDSPrice {
    let value = link["_"];
    let currencyCode = this.parseAttribute(link, "currencyCode");

    return { value, currencyCode };
  }
}
