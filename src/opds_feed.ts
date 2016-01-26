import OPDSLink from "../src/opds_link";

export default class OPDSFeed {
  links: Array<OPDSLink>;
  constructor(links: Array<OPDSLink>) {
    this.links = links;
  }
}