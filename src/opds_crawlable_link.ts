import OPDSLink, { OPDSLinkArgs } from "./opds_link";

export default class OPDSCrawlableLink extends OPDSLink {
  static REL = "http://opds-spec.org/crawlwable";
  constructor(args: OPDSLinkArgs) {
    args.rel = OPDSCrawlableLink.REL;
    super(args);
  }
}