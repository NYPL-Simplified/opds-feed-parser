import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSAcquisitionLink extends OPDSLink {
  static BASE_REL = "http://opds-spec.org/acquisition";
  static GENERIC_REL = OPDSAcquisitionLink.BASE_REL;
  static OPEN_ACCESS_REL = OPDSAcquisitionLink.BASE_REL + "/open-access";
  static BORROW_REL = OPDSAcquisitionLink.BASE_REL + "/borrow";
  static BUY_REL = OPDSAcquisitionLink.BASE_REL + "/buy";
  static SAMPLE_REL = OPDSAcquisitionLink.BASE_REL + "/sample";
  static SUBSCRIBE_REL = OPDSAcquisitionLink.BASE_REL + "/subscribe";
  static RELS = [
    OPDSAcquisitionLink.GENERIC_REL,
    OPDSAcquisitionLink.OPEN_ACCESS_REL,
    OPDSAcquisitionLink.BORROW_REL,
    OPDSAcquisitionLink.BUY_REL,
    OPDSAcquisitionLink.SAMPLE_REL,
    OPDSAcquisitionLink.SUBSCRIBE_REL
  ];

  constructor(args: OPDSLinkArgs) {
    super(args);
  }
}