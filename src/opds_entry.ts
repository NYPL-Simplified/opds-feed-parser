import OPDSLink from "./opds_link";
import Contributor from "./contributor";
import Category from "./category";
import Summary from "./summary";

export default class OPDSEntry {
  id: string;
  updated: string;
  title: string;
  authors: Array<Contributor>;
  contributors: Array<Contributor>;
  links: Array<OPDSLink>;
  categories: Array<Category>;
  identifiers: Array<string>;
  issued: string;
  rights: string;
  published: string;
  summary: Summary;

  constructor(
    id: string,
    updated: string,
    title: string,
    authors: Array<Contributor>,
    contributors: Array<Contributor>,
    links: Array<OPDSLink>,
    categories: Array<Category>,
    identifiers: Array<string>,
    issued: string,
    rights: string,
    published: string,
    summary: Summary
  ) {

    this.id = id;
    this.updated = updated;
    this.title = title;
    this.authors = authors;
    this.contributors = contributors;
    this.links = links;
    this.categories = categories;
    this.identifiers = identifiers;
    this.issued = issued;
    this.rights = rights;
    this.published = published;
    this.summary = summary;
  }
}