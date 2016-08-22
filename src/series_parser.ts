import Series from "./series";
import NamespaceParser from "./namespace_parser";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class SeriesParser extends Xml2jsOutputParser<Series> {
  parse(series: any): Series {
    let schemaPrefix = this.prefixes[NamespaceParser.SCHEMA_URI];

    let name = this.parseAttribute(series, "name");
    let position = this.parseAttribute(series, schemaPrefix + "position");
    return new Series({ name, position });
  }
}