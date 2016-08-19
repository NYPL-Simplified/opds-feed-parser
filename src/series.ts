export default class Series {
  name: string;
  position: number;

  constructor(args: SeriesArgs) {
    Object.assign(this, args);
  }
}

export interface SeriesArgs extends Series {
}