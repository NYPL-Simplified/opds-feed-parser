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
  language: string;
  rights: string;
  publisher: string;
  published: string;
  summary: Summary;
  unparsed: any;

  constructor(args: OPDSEntryArgs) {
    Object.assign(this, args);
  }
}

export interface OPDSEntryArgs extends OPDSEntry {
}