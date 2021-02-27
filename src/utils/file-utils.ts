/**
 * Xml formatter
 *
 * @author Florian Thauvin
 * @license MIT
 */

import { READING_EXCEPTION, WRITING_EXCEPTION } from "../model/exceptions";

/**
 * Get file system to manage files
 */
const fs = require("fs");

/**
 * Function used to read a xml
 *
 * @param xmlPath path to the file
 *
 * @returns the xml text as string readed
 * @throws READING_EXCEPTION
 */
export function readXml(xmlPath: string): string {
  let rawXml: string;

  try {
    rawXml = fs.readFileSync(xmlPath, "utf8");
  } catch (exception) {
    console.error(`Error during reading file ${xmlPath}`, exception);
    throw new Error(READING_EXCEPTION);
  }

  return rawXml;
}

/**
 * Function used to write a xml
 *
 * @param xmlPath path to the file
 * @content the xml text as string to write
 *
 * @throws WRITING_EXCEPTION
 */
export function writeXml(xmlPath: string, content: string) {
  try {
    fs.writeFileSync(xmlPath, content, "utf8");
  } catch (exception) {
    console.error(`Error during writing file ${xmlPath}`, exception);
    throw new Error(WRITING_EXCEPTION);
  }
}
