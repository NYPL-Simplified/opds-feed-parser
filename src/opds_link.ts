export default class OPDSLink {
  href: string;
  rel: string;
  type: string;
  title: string;
  constructor(href: string, rel: string, type: string, title: string) {
    this.href = href;
    this.rel = rel;
    this.type = type;
    this.title = title;
  }
}