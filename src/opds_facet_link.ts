import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSFacetLink extends OPDSLink {
  static REL = "http://opds-spec.org/facet";
  facetGroup: string;
  activeFacet: boolean;
  count: number;

  constructor(args: OPDSFacetLinkArgs) {
    args.rel = OPDSFacetLink.REL;
    super(args);
  }
}

export interface OPDSFacetLinkArgs extends OPDSLinkArgs {
  facetGroup: string;
  activeFacet: boolean;
  count: number;
}