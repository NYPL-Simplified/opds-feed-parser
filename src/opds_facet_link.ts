import OPDSLink from "./opds_link";

export default class OPDSFacetLink extends OPDSLink {
  static REL = "http://opds-spec.org/facet";
  constructor(href: string, type: string, title: string) {
    super(href, OPDSFacetLink.REL, type, title);
  }
}