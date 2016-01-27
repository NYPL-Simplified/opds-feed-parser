import OPDSLink from "./opds_link";

export default class OPDSFeed {
  title: string;
  links: Array<OPDSLink>;
  constructor(title: string, links: Array<OPDSLink>) {
    this.title = title;
    this.links = links;
  }
}