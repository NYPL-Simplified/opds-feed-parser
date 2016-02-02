///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import OPDSLink, { OPDSLinkArgs } from "./opds_link";
import * as Immutable from "immutable";
import OPDSPrice from "./opds_price";

export default class OPDSAcquisitionLink extends OPDSLink {
  static BASE_REL = "http://opds-spec.org/acquisition";
  static GENERIC_REL = OPDSAcquisitionLink.BASE_REL;
  static OPEN_ACCESS_REL = OPDSAcquisitionLink.BASE_REL + "/open-access";
  static BORROW_REL = OPDSAcquisitionLink.BASE_REL + "/borrow";
  static BUY_REL = OPDSAcquisitionLink.BASE_REL + "/buy";
  static SAMPLE_REL = OPDSAcquisitionLink.BASE_REL + "/sample";
  static SUBSCRIBE_REL = OPDSAcquisitionLink.BASE_REL + "/subscribe";
  static RELS = Immutable.List<string>([
    OPDSAcquisitionLink.GENERIC_REL,
    OPDSAcquisitionLink.OPEN_ACCESS_REL,
    OPDSAcquisitionLink.BORROW_REL,
    OPDSAcquisitionLink.BUY_REL,
    OPDSAcquisitionLink.SAMPLE_REL,
    OPDSAcquisitionLink.SUBSCRIBE_REL
  ]);

  prices: OPDSPrice[];

  constructor(args: OPDSAcquisitionLinkArgs) {
    super(args);
  }
}

export interface OPDSAcquisitionLinkArgs extends OPDSLinkArgs {
  prices: OPDSPrice[];
}