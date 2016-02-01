export default class Summary {
  content: string;
  link: string;

  constructor(args: SummaryArgs) {
    Object.assign(this, args);
  }
}

export interface SummaryArgs extends Summary {
}