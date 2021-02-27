import xml = require("../../src/xml-format");
const path = require("path");

function main() {
  xml.processXml(path.resolve("../formatting_1/Input.xml"));
}

main();
