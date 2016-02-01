import OPDSLink from "./opds_link";

export default class AlternateLink extends OPDSLink {
  static REL = "alternate";
  constructor(href: string, type: string, title: string) {
    super(href, AlternateLink.REL, type, title);
  }
}