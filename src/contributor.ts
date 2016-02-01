export default class Contributor {
  name: string;
  uri: string;

  constructor(args: ContributorArgs) {
    Object.assign(this, args);
  }
}

export interface ContributorArgs extends Contributor {
}