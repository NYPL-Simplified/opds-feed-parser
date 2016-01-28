import OPDSLink from "./opds_link";

export default class SearchLink extends OPDSLink {
  static REL = "search";
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  constructor(href: string, type: string, title: string, totalResults: number, startIndex: number, itemsPerPage: number) {
    this.totalResults = totalResults;
    this.startIndex = startIndex;
    this.itemsPerPage = itemsPerPage;
    super(href, SearchLink.REL, type, title);
  }
}