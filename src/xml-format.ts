import { readXml } from "./utils/file-utils";
import { processXmlString } from "./processing/xml-processing";
import { IXmlFormatting } from "./model/interfaces";

export function processXmlFile(xmlPath: string, options?: IXmlFormatting): string {
	const rawXml = readXml(xmlPath);
	return processXmlString(rawXml, options);
}
