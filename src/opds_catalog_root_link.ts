import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSCatalogRootLink extends OPDSLink {
  static REL = "start";
  constructor(args: OPDSLinkArgs) {
    let argsWithRel = Object.assign(args, { rel: OPDSCatalogRootLink.REL });
    super(argsWithRel);
  }
}