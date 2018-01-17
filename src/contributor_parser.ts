import Contributor from "./contributor";
import NamespaceParser from "./namespace_parser";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class ContributorParser extends Xml2jsOutputParser<Contributor> {
  parse(contributor: any): Contributor {
    let name = this.parseSubtagContent(contributor, "name");
    let uri = this.parseSubtagContent(contributor, "uri");

    let opfPrefix = this.prefixes[NamespaceParser.OPF_URI];
    let role = this.parseAttribute(contributor, opfPrefix + "role");

    return new Contributor({ name, uri, role });
  }
}