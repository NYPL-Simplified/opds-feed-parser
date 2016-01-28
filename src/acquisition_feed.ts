import OPDSFeed from "./opds_feed";
import OPDSEntry from "./opds_entry";
import OPDSLink from "./opds_link";

export default class AcquisitionFeed extends OPDSFeed {
  constructor(title: string, entries: Array<OPDSEntry>, links: Array<OPDSLink>) {
    super(title, entries, links);
  }
}