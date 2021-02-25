import { readXml } from "./utils/file-utils";
import { processXmlString } from "./processing/xml-processing";

export function processXmlFile(xmlPath: string): string {
	const rawXml = readXml(xmlPath);
	return processXmlString(rawXml);
}
