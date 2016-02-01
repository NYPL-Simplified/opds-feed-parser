import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class AlternateLink extends OPDSLink {
  static REL = "alternate";
  constructor(args: OPDSLinkArgs) {
    args.rel = AlternateLink.REL;
    super(args);
  }
}