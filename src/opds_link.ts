export default class OPDSLink {
  href: string;
  rel: string;
  constructor(href: string, rel: string) {
    this.href = href;
    this.rel = rel;
  }
}