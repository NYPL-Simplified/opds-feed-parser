///<reference path='../node_modules/immutable/dist/immutable.d.ts'/>
import Immutable = require("immutable");
import XMLInterface = require("./xml_interface");

export default class NamespaceParser {
  atomPrefix(namespaces: any): string {
    let atomNamespace = Immutable.Map<string, XMLInterface.XMLNamespace>(namespaces).find((ns) => {
      return ns.value === "http://www.w3.org/2005/Atom";
    });
    let atomPrefix = "";
    if (atomNamespace) {
      atomPrefix = atomNamespace.local;
      if (atomPrefix.length > 0) {
        atomPrefix += ":";
      }
    }
    return atomPrefix;
  }
}