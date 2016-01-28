import OPDSLink from "./opds_link";

export default class OPDSEntry {
  id: string;
  updated: string;
  title: string;
  links: Array<OPDSLink>;
  identifiers: Array<string>;
  issued: string;
  constructor(id: string, updated: string, title: string, links: Array<OPDSLink>, identifiers: Array<string>, issued: string) {
    this.id = id;
    this.updated = updated;
    this.title = title;
    this.links = links;
    this.identifiers = identifiers;
    this.issued = issued;
  }
}