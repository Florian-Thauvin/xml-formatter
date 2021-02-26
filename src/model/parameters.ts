import { IInternalOptions } from "./interfaces";

/**
 * Default parameters used to format a xml
 * 
 * @implements IXmlFormatting
 */
export const defaultParameters: IInternalOptions = {
    endLineChar: '\r\n',
    indentation: '  ',
    maxLineLenght: 120,
    maxNumberOfBlankLines: 1,
    maxNumberOfSpaces: 1,
    spacesBetweenMarks: 0
}

/**
 * String definition of a start of a mark
 * @value <
 */
export const xmlStartMarkChar: string = '<';
/**
 * String definition for an end of a mark
 * @value >
 */
export const xmlEndMarkChar: string = '>';
/**
 * String definition for the start of an end mark
 * @value </
 */
export const xmlCloseMarkChar: string = '</';

/**
 * String definition for the start of a comment
 * @value <!--
 */
export const xmlCommentStartChar: string = '<!--'
/**
 * String definition for the end of a comment
 * @value -->
 */
export const xmlCommentEndChar: string = '-->';;

/**
 * Regexp used to find the start of a mark. Excludes start of end marks.
 * @value /<[^/!]/g
 */
export const xmlStartMarkRegExp: RegExp = /<[^/!]/g;
/**
 *  Regexp used to find the end of a mark.
 * @value /></g
 */
export const xmlMarkInLineRegExp: RegExp = /></g;
/**
 * Regexp used to find the end of a line
 * @value /\r?\n/gm
 */
export const xmlEndLineRegExp: RegExp = /\r?\n/gm;
/**
 * Regexp used to find multi spaces
 * @value /\s\s+/g
 */
export const spacesBetweenTwoCharRegExp: RegExp = /\s\s+/g;
