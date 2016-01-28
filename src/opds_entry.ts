import OPDSLink from "./opds_link";
import Author from "./author";

export default class OPDSEntry {
  id: string;
  updated: string;
  title: string;
  authors: Array<Author>;
  links: Array<OPDSLink>;
  identifiers: Array<string>;
  issued: string;
  constructor(
    id: string,
    updated: string,
    title: string,
    authors: Array<Author>,
    links: Array<OPDSLink>,
    identifiers: Array<string>,
    issued: string
  ) {

    this.id = id;
    this.updated = updated;
    this.title = title;
    this.authors = authors;
    this.links = links;
    this.identifiers = identifiers;
    this.issued = issued;
  }
}