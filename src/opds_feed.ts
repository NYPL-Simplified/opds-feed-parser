import OPDSEntry from "./opds_entry";
import OPDSLink from "./opds_link";

export default class OPDSFeed {
  title: string;
  entries: Array<OPDSEntry>;
  links: Array<OPDSLink>;
  constructor(title: string, entries: Array<OPDSEntry>, links: Array<OPDSLink>) {
    this.title = title;
    this.entries = entries;
    this.links = links;
  }
}