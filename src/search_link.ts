import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class SearchLink extends OPDSLink {
  static REL = "search";
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;

  constructor(args: SearchLinkArgs) {
    args.rel = SearchLink.REL;
    super(args);
  }
}

export interface SearchLinkArgs extends OPDSLinkArgs {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
}