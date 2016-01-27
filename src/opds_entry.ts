import OPDSLink from "./opds_link";

export default class OPDSEntry {
  links: Array<OPDSLink>;
  constructor(links: Array<OPDSLink>) {
    this.links = links;
  }
}