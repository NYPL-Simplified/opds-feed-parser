import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class SearchLink extends OPDSLink {
  static REL = "search";
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;

  constructor(args: SearchLinkArgs) {
    let argsWithRel = Object.assign(args, { rel: SearchLink.REL });
    super(argsWithRel);
  }
}

export interface SearchLinkArgs extends OPDSLinkArgs {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
}