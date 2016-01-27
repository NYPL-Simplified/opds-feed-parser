import OPDSFeed from "./opds_feed";
import OPDSLink from "./opds_link";

export default class NavigationFeed extends OPDSFeed {
  constructor(title: string, links: Array<OPDSLink>) {
    super(title, links);
  }
}