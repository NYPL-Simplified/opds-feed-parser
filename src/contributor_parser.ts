import Contributor, { ContributorArgs } from "./contributor";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class ContributorParser extends Xml2jsOutputParser<Contributor> {
  parse(contributor: any): Contributor {
    let name = this.parseSubtagContent(contributor, "name");
    let uri = this.parseSubtagContent(contributor, "uri");
    return new Contributor(<ContributorArgs>{ name, uri });
  }
}