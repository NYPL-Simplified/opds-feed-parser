import OPDSFeed from "./opds_feed";
import OPDSLink from "./opds_link";

export default class AcquisitionFeed extends OPDSFeed {
  constructor(title: string, links: Array<OPDSLink>) {
    super(title, links);
  }
}