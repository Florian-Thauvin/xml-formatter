/**
 * Xml formatter
 *
 * @author Florian Thauvin
 * @license MIT
 */

/**
 * Options of xml formatting
 *
 * @properties endLineChar, indentation, maxLineLenght, maxNumberOfBlankLines, maxNumberOfSpaces, spacesBetweenMarks
 */
export interface IXmlFormatting {
  /**
   * @description separator used between each line for formatting
   * @type string
   * @defaultValue \r\n
   */
  endLineChar?: string;

  /**
   * @description string used to indent all xml lines
   * @type string
   * @defaultValue two spaces
   */
  indentation?: string;

  /**
   * @description max lenght of a line
   * @type number
   * @defaultValue 120 char
   */
  maxLineLenght?: number;

  /**
   * @description max number of blanks lines alloweds between two lines
   * @type number
   * @defaultValue 1
   */
  maxNumberOfBlankLines?: number;

  /**
   * @description max number of spaces between two char (doesn't affect indentation)
   * @type number
   * @defaultValue 1
   */
  maxNumberOfSpaces?: number;

  /**
   * @description space between a mark declaration and his body
   * @type number
   * @defaultValue 1
   */
  spacesBetweenMarks?: number;
}

/**
 * Internal Xml options
 * Derived of IXmlFormatting, but with all parameters mandatory
 */
export interface IInternalOptions {
  /**
   * @description separator used between each line for formatting
   * @type string
   * @defaultValue \r\n
   */
  endLineChar: string;

  /**
   * @description string used to indent all xml lines
   * @type string
   * @defaultValue two spaces
   */
  indentation: string;

  /**
   * @description max lenght of a line
   * @type number
   * @defaultValue 120 char
   */
  maxLineLenght: number;

  /**
   * @description max number of blanks lines alloweds between two lines
   * @type number
   * @defaultValue 1
   */
  maxNumberOfBlankLines: number;

  /**
   * @description max number of spaces between two char (doesn't affect indentation)
   * @type number
   * @defaultValue 1
   */
  maxNumberOfSpaces: number;

  /**
   * @description space between a mark declaration and his body
   * @type number
   * @defaultValue 1
   */
  spacesBetweenMarks: number;
}
