import { readXml } from "./utils/file-utils";
/**
 * Xml formatter
 *
 * @author Florian Thauvin
 * @license MIT
 */

import { processXmlString } from "./processing/xml-processing";
import { IXmlFormatting } from "./model/interfaces";

/**
 * Function used to read and process a xml file
 *
 * @param xmlPath path to the file
 * @param options formatting options to apply
 *
 * @returns the formatted xml in function of the options
 * @throws READING_EXCEPTION
 */
export function processXmlFile(
  xmlPath: string,
  options?: IXmlFormatting
): string {
  const rawXml = readXml(xmlPath);
  return processXmlString(rawXml, options);
}
