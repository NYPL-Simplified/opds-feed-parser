export default class Category {
  term: string;
  scheme: string;
  label: string;
  constructor(term: string, scheme: string, label: string) {
    this.term = term;
    this.scheme = scheme;
    this.label = label;
  }
}