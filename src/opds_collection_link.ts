import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSCollectionLink extends OPDSLink {
  static REL = "collection";
  constructor(args: OPDSLinkArgs) {
    args.rel = OPDSCollectionLink.REL;
    super(args);
  }
}