import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSShelfLink extends OPDSLink {
  static REL = "http://opds-spec.org/shelf";
  constructor(args: OPDSLinkArgs) {
    args.rel = OPDSShelfLink.REL;
    super(args);
  }
}