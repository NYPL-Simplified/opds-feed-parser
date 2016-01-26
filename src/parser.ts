///<reference path="../typings/core-js/core-js.d.ts"/>
///<reference path="../typings/xml2js/xml2js.d.ts"/>
import xml2js = require("xml2js");

export default class Parser {
  parse(s: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      xml2js.parseString(s, (err, result) => {
        if (err) {
	  reject(err);
	} else {
	  resolve(result);
	}
      });
    });
  }
}
