import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSCatalogRootLink extends OPDSLink {
  static REL = "start";
  constructor(args: OPDSLinkArgs) {
    args.rel = OPDSCatalogRootLink.REL;
    super(args);
  }
}