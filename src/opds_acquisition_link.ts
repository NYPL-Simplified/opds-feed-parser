import OPDSLink from "./opds_link";

export default class OPDSAcquisitionLink extends OPDSLink {
  static REL = "http://opds-spec.org/acquisition";
  constructor(href: string, type: string, title: string) {
    super(href, OPDSAcquisitionLink.REL, type, title);
  }
}