import OPDSFeed, { OPDSFeedArgs } from "./opds_feed";
import OPDSEntry from "./opds_entry";
import OPDSLink from "./opds_link";

export default class AcquisitionFeed extends OPDSFeed {
  constructor(args: OPDSFeedArgs) {
    super(args);
  }
}