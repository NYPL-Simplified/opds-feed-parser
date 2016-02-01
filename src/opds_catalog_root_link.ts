import OPDSLink from "./opds_link";

export default class OPDSCatalogRootLink extends OPDSLink {
  static REL = "start";
  constructor(href: string, type: string, title: string) {
    super(href, OPDSCatalogRootLink.REL, type, title);
  }
}