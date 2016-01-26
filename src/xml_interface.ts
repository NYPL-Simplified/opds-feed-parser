export interface XMLLink {
  "$"?: {
    href: {
      value: string
    };
    rel: {
      value: string
    };
  };
}

export interface XMLNamespace {
  value: string;
  local: string;
}

export interface XMLFeed {
  "$": Array<XMLNamespace>;
}