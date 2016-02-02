import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSArtworkLink extends OPDSLink {
  static BASE_REL = "http://opds-spec.org/image";
  static IMAGE_REL = OPDSArtworkLink.BASE_REL;
  static THUMBNAIL_REL = OPDSArtworkLink.BASE_REL + "/thumbnail";
  static RELS = [
    OPDSArtworkLink.IMAGE_REL,
    OPDSArtworkLink.THUMBNAIL_REL
  ];

  constructor(args: OPDSLinkArgs) {
    super(args);
  }
}