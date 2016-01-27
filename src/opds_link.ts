export default class OPDSLink {
  href: string;
  rel: string;
  type: string;
  constructor(href: string, rel: string, type: string) {
    this.href = href;
    this.rel = rel;
    this.type = type;
  }
}