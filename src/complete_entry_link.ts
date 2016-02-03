import AlternateLink from "./alternate_link";
import { OPDSLinkArgs } from "./opds_link";

export default class CompleteEntryLink extends AlternateLink {
  static TYPE = "application/atom+xml;type=entry;profile=opds-catalog";
  constructor(args: OPDSLinkArgs) {
    args.type = CompleteEntryLink.TYPE;
    super(args);
  }
}