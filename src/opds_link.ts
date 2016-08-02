export default class OPDSLink {
  href: string;
  rel: string;
  type: string;
  title: string;

  constructor(args: OPDSLinkArgs) {
    Object.assign(this, args);
  }
}

export interface OPDSLinkArgs {
  href: string;
  type?: string;
  title?: string;
  rel?: string;
}