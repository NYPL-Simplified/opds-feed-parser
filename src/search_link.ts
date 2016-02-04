import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class SearchLink extends OPDSLink {
  static REL = "search";

  constructor(args: OPDSLinkArgs) {
    args.rel = SearchLink.REL;
    super(args);
  }
}