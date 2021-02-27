/**
 * Xml formatter
 *
 * @author Florian Thauvin
 * @license MIT
 */

import {
  xmlCloseMarkChar,
  xmlEndMarkChar,
  xmlStartMarkRegExp,
} from "../model/parameters";

/**
 * Function used to supress indentation before starting mark
 *
 * @param line string to process
 *
 * @returns the line without indentation
 */
export function supressIndentation(line: string): string {
  return line.slice(line.search(/[^\s]/));
}

/**
 * Determine if the line is blank or not
 *
 * @param line string to test
 *
 * @returns true if the line is defined, with a size greater than 0 and with at least one non space char
 */
export function isLineNotBlank(line: string): boolean {
  return line !== undefined && line.length > 0 && line.search(/\S/) !== -1;
}

/**
 * Function used to recreate a closing mark from a mark
 *
 * @param mark the mark to reconstruct
 *
 * @returns the corresponding closing mark
 */
export function getEndMark(mark: string): string {
  return `${xmlCloseMarkChar}${mark}${xmlEndMarkChar}`;
}

/**
 * Function used to retreive the first mark of a line
 *
 * @param line string to process
 *
 * @returns the first mark of the line or a blank if the line doesn't have mark
 */
export function getXmlMark(line: string): string {
  // Initialize retun value
  let toReturn = "";
  // We get the index of the start mark
  const startLineIndex = line.search(xmlStartMarkRegExp);

  // If we have a start index
  if (startLineIndex != -1) {
    // We get the first space AFTER start mark (line doesn't have indentation)
    const firstSpaceIndex: number = line.search(/\s/);
    // We get the first closing xml tag
    const firstEndMarkIndex: number = line.indexOf(xmlEndMarkChar);
    let endMarkIndex: number;

    // We check if we found a space
    if (firstSpaceIndex !== -1) {
      // We check if the have a end mark
      if (firstEndMarkIndex !== -1) {
        // We get the first one
        endMarkIndex =
          firstSpaceIndex < firstEndMarkIndex
            ? firstSpaceIndex
            : firstEndMarkIndex;
      } else {
        // We get the space
        endMarkIndex = firstSpaceIndex;
      }
    } else {
      // If we doesn't have a space, it's the end mark
      // If we don't have a closing tag, we can't process
      endMarkIndex = firstEndMarkIndex;
    }

    // We extract the mark
    toReturn = line.slice(startLineIndex + 1, endMarkIndex);
  }
  return toReturn;
}
