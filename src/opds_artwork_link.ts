///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import OPDSLink, { OPDSLinkArgs } from "./opds_link";
import * as Immutable from "immutable";

export default class OPDSArtworkLink extends OPDSLink {
  static BASE_REL = "http://opds-spec.org/image";
  static IMAGE_REL: string = OPDSArtworkLink.BASE_REL;
  static THUMBNAIL_REL: string = OPDSArtworkLink.BASE_REL + "/thumbnail";
  static RELS = Immutable.List<string>([
    OPDSArtworkLink.IMAGE_REL,
    OPDSArtworkLink.THUMBNAIL_REL
  ]);
}