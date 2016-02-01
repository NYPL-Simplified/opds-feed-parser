import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSAcquisitionLink extends OPDSLink {
  static REL = "http://opds-spec.org/acquisition";
  constructor(args: OPDSLinkArgs) {
    args.rel = OPDSAcquisitionLink.REL;
    super(args);
  }
}