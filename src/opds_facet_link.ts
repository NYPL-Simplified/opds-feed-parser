import OPDSLink from "./opds_link";

export default class OPDSFacetLink extends OPDSLink {
  static REL = "http://opds-spec.org/facet";
  facetGroup: string;
  activeFacet: boolean;
  count: number;
  constructor(href: string, type: string, title: string, facetGroup: string, activeFacet: boolean, count: number) {
    this.facetGroup = facetGroup;
    this.activeFacet = activeFacet;
    this.count = count;
    super(href, OPDSFacetLink.REL, type, title);
  }
}