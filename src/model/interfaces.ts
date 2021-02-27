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
   * Separator used between each line for formatting
   * @type string
   * @defaultValue \r\n
   */
  endLineChar?: string;

  /**
   * String used to indent all xml lines
   * @type string
   * @defaultValue two spaces
   */
  indentation?: string;

  /**
   * Max lenght of a line
   * @type number
   * @defaultValue 120 char
   */
  maxLineLenght?: number;

  /**
   * Max number of blanks lines alloweds between two lines
   * @type number
   * @defaultValue 1
   */
  maxNumberOfBlankLines?: number;

  /**
   * Max number of spaces between two char (doesn't affect indentation)
   * @type number
   * @defaultValue 1
   */
  maxNumberOfSpaces?: number;

  /**
   * Space between a mark declaration and his body
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
   * Separator used between each line for formatting
   * @type string
   * @defaultValue \r\n
   */
  endLineChar: string;

  /**
   * String used to indent all xml lines
   * @type string
   * @defaultValue two spaces
   */
  indentation: string;

  /**
   * Max lenght of a line
   * @type number
   * @defaultValue 120 char
   */
  maxLineLenght: number;

  /**
   * Max number of blanks lines alloweds between two lines
   * @type number
   * @defaultValue 1
   */
  maxNumberOfBlankLines: number;

  /**
   * Max number of spaces between two char (doesn't affect indentation)
   * @type number
   * @defaultValue 1
   */
  maxNumberOfSpaces: number;

  /**
   * Space between a mark declaration and his body
   * @type number
   * @defaultValue 1
   */
  spacesBetweenMarks: number;
}
