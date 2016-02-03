import OPDSEntry from "./opds_entry";
import PartialOPDSEntry from "./partial_opds_entry";
import CompleteEntryLink from "./complete_entry_link";
import LinkParser from "./link_parser";
import ContributorParser from "./contributor_parser";
import CategoryParser from "./category_parser";
import NamespaceParser from "./namespace_parser";
import Summary from "./summary";
import Xml2jsOutputParser from "./xml2js_output_parser";

export default class EntryParser extends Xml2jsOutputParser<OPDSEntry> {
  parse(entry: any): OPDSEntry {
    let linkParser = new LinkParser(this.prefixes);
    let atomPrefix = this.prefixes[NamespaceParser.ATOM_URI];
    let dcPrefix = this.prefixes[NamespaceParser.DC_URI];

    let id = this.parseSubtagContent(entry, atomPrefix + "id");
    let updated = this.parseSubtagContent(entry, atomPrefix + "updated");
    let title = this.parseSubtagContent(entry, atomPrefix + "title");

    let contributorParser = new ContributorParser(this.prefixes);
    let authors = this.parseSubtags(entry, atomPrefix + "author", contributorParser);
    let contributors = this.parseSubtags(entry, atomPrefix + "contributor", contributorParser);

    let links = this.parseSubtags(entry, atomPrefix + "link", linkParser);

    let categoryParser = new CategoryParser(this.prefixes);
    let categories = this.parseSubtags(entry, atomPrefix + "category", categoryParser);

    let rawIdentifiers = entry[dcPrefix + "identifier"];
    let identifiers: Array<string>;
    if (rawIdentifiers && rawIdentifiers.length > 0) {
      identifiers = rawIdentifiers.map((identifier) => {
        return identifier["_"];
      });
    } else {
      identifiers = [];
    }

    let issued = this.parseSubtagContent(entry, dcPrefix + "issued");
    let rights = this.parseSubtagContent(entry, atomPrefix + "rights");
    let published = this.parseSubtagContent(entry, atomPrefix + "published");

    let summaryLink;
    let summaryContent = this.parseSubtagContent(entry, atomPrefix + "summary");
    if (!summaryContent) {
      summaryContent = this.parseSubtagContent(entry, atomPrefix + "content");
    }
    if (!summaryContent) {
      let subtag = entry[atomPrefix + "content"];
      if (subtag && subtag.length > 0) {
        summaryLink = this.parseAttribute(subtag[0], "src");
      }
    }
    let summary = new Summary({ content: summaryContent, link: summaryLink });

    let entryClass = OPDSEntry;
    let completeEntryLink = links.find((link) => {
      return (link instanceof CompleteEntryLink);
    });
    if (completeEntryLink) {
      entryClass = PartialOPDSEntry;
    }

    return new entryClass({
       id,
       updated,
       title,
       authors,
       contributors,
       links,
       categories,
       identifiers,
       issued,
       rights,
       published,
       summary
    });
  }
}