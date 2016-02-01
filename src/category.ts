export default class Category {
  term: string;
  scheme: string;
  label: string;

  constructor(args: CategoryArgs) {
    Object.assign(this, args);
  }
}

export interface CategoryArgs extends Category {
}