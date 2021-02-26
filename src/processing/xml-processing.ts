/**
 * Xml formatter
 * 
 * @author Florian Thauvin
 * @license MIT
 */

import { defaultParameters, spacesBetweenTwoCharRegExp, xmlCloseMarkChar, xmlCommentEndChar, xmlCommentStartChar, xmlEndLineRegExp, xmlEndMarkChar, xmlMarkInLineRegExp, xmlStartMarkChar, xmlStartMarkRegExp } from '../model/parameters';
import { IXmlFormatting } from '../model/interfaces';
import { getEndMark, getXmlMark, isLineNotBlank, supressIndentation } from '../utils/string-utils';

/**
 * Buffer for formatted lines
 */
let formattedLines: string[];
/**
 * The actual indentation
 */
let actualIndentation: number;
/**
 * Buffer for all marks finded
 */
let xmlMarks: string[];
/**
 * The last mark index in the buffer
 */
let lastMarkIndex: number;

/**
 * A ponctual indentation to add
 */
let tempIndentation: number;
/**
 * Defines if we are in a multi line comment
 */
let isMultiLineComment: boolean;
/**
 * Actual number of blanks lines founded
 */
let numberOfBlankLines: number;

/**
 * User formatting preferences
 */
let options: IXmlFormatting;

/**
 * Function used to process an xml file
 * 
 * @param rawXml the raw xml text as string
 * @param xmlOptions options to used to format xml
 * 
 * @returns the xml formatted as string
 */
export function processXmlString(rawXml: string, xmlOptions?: IXmlFormatting): string {
    // First we reset all global var
    resetGlobalVar();
    // We create generic options by mixing default options and user options
    options = {...defaultParameters, ...xmlOptions};

    // We split the xml text by line 
    const rawXmlByLines: string[] = rawXml.split(xmlEndLineRegExp);

    // We check each xml line
    rawXmlByLines.forEach((line: string) => {
        // The indentation specific to this line
        tempIndentation = 0;
        
        // Check if the line is blank (only spaces) or not
        if (!isLineNotBlank(line)) {
            // If we can add this line
            if(numberOfBlankLines < options.maxNumberOfBlankLines){
                // We have a blank line, just add a new line without spaces
                formattedLines.push('');
                numberOfBlankLines++;
            }
        } else {
            // Reset the number of blank lines
            numberOfBlankLines = 0;
            // We suppress the old indentation
            let processLine = supressIndentation(line);

            // If it contains the last mark, ie it's a closing mark
            if (processLine.includes(getEndMark(xmlMarks[lastMarkIndex]))) {
                removeLastMark();
            }

            // We check if it's a comment
            if(processLine.includes(xmlCommentStartChar)){
                // We have a starting and end comment mark: it's a comment inline
                if(processLine.includes(xmlCommentEndChar)){
                    manageOneLineComment(processLine);
                } else {
                    // We are in a multi line comment
                    isMultiLineComment = true;
                    addLine(xmlCommentStartChar, 1);
                }
            } else {
                // We don't have a starting comment mark
                // We can have a end comment mark if we are in a multi line comment
                if(processLine.includes(xmlCommentEndChar)) {
                    // Reset the multi line comment
                    isMultiLineComment = false;
                    addLine(xmlCommentEndChar, 1);

                    // We check if we have a mark / line to add
                    const lineWithoutEndComment = processLine.slice(processLine.indexOf(xmlCommentEndChar) + xmlCommentEndChar.length);
                    if(isLineNotBlank(lineWithoutEndComment)){
                        processMark(supressIndentation(lineWithoutEndComment));
                    }
                }
                else {
                   // Check if we are in a multi line comment
                   if(isMultiLineComment){
                       // If we are in a multi line, just add it
                    addLine(processLine, 2);
                   } else {
                       // We process the line as usal
                    processMark(processLine);
                   }
                }
            }
        }
    });

    // We return all lines joined by an end line
    return formattedLines.join(options.endLineChar);
}

/**
 * Function used to reset all var before processing xml
 */
function resetGlobalVar(){
    // Reset processed lines buffer
    formattedLines = [];
    // Reset list of marks
    xmlMarks = [];

    // Set the actual indentation to -1 (first opening mark will set it to 0)
    actualIndentation = -1;
    // The index of the last mark to -1 (first opening mark will set it to 0)
    lastMarkIndex = -1;
    // Actual number of blank (i.e with only spaces) lines
    numberOfBlankLines = 0;

    // Set the multi line to fase
    isMultiLineComment = false;
}

/**
 * Function used to remove the last mark
 */
function removeLastMark(){
    // Decrease indentation
    actualIndentation--;
    // Delete marks from list
    xmlMarks.splice(lastMarkIndex, 1);
    // Decrease mark index
    lastMarkIndex--;
}

/**
 * Function used to process a xml mark
 * 
 * @param line string to process
 */
function processMark(line: string) {
    // We repleace all spaces in the line with the used spaces
    const processedLine: string = replaceAllSpaces(line);

    // If we have a xml mark
    if (processedLine.includes(xmlStartMarkChar)) {
        // We get the xml mark of the line
        const newMark: string = getXmlMark(processedLine);

        // If we found one mark
        if(newMark !== ''){
            // We construct the end mark from the xml mark
            const endMark: string = getEndMark(newMark);

            // If we don't found this mark, it's a multi line xml
            if (!processedLine.includes(endMark)) {
                // We add the  mark
                xmlMarks.push(newMark);
                // Increment all compts
                actualIndentation++;
                lastMarkIndex++;
                // We add the declaration
                addLine(processedLine);
            } else {
                // We manage an inline xml
                manageInLineMark(processedLine, endMark);
            }
        } else {
            // We don't have a mark, we just add the xml body
            tempIndentation++;
            addLine(processedLine);
        }
    } else {
        // Here we are in a special case: we are in a mark
        tempIndentation += 2;
        addLine(processedLine);
    }
}

/**
 * Function used to replace all spaces in a line using user preferences
 * 
 * @param line string to process
 * 
 * @returns the line with all spaces replaced in function of the user preferences
 */
function replaceAllSpaces(line: string): string {
    // We replace all spaces between two char by the number of desired spaces
    return line.replace(spacesBetweenTwoCharRegExp, ' '.repeat(options.maxNumberOfSpaces));
}

/**
 * Function used to process an inline comment
 * 
 * @param line the string to process
 */
function manageOneLineComment(line: string) {
    // The index of the start of the comment
    const startCommentIndex: number = line.indexOf(xmlCommentStartChar);
    // The index of the end of the comment
    const endCommentIndex: number = line.indexOf(xmlCommentEndChar) + xmlCommentEndChar.length;

    // We get all before the comment
    const beforeComment = line.slice(0, startCommentIndex);
    // We get all after the comment
    const afterComment = line.slice(endCommentIndex);

    // If we have the end mark 
    if(line.search(xmlStartMarkRegExp) !== -1) {
        // We check if we have something before the comment
        if(isLineNotBlank(beforeComment)){
            // We process it
            processMark(beforeComment);
        }

        // We add the comment
        addLine(line.slice(startCommentIndex, endCommentIndex), 1);

        // We check if we have something after the comment
        if(isLineNotBlank(afterComment)) {
            // We process it
            processMark(afterComment);
        }
    } else {
        // We are in a line without an other mark, we just add the comment
        addLine(replaceAllSpaces(line), 1);
    }
}

/**
 * Function used to add a line to the buffer
 * 
 * @param line the string to add
 * @param optionnalSpacing if we want to add a ponctual spacing
 */
function addLine(line: string, optionnalSpacing: number = 0){
    // We recreate the indentation
    const indentation: string = options.indentation.repeat(actualIndentation + tempIndentation + optionnalSpacing);

    // Check line lenght
    if(indentation.length + line.length < options.maxLineLenght){
        // We are under the max length, just add it
        formattedLines.push(`${indentation}${line}`);
    } else {
        // We are upper the max length, need to split it
        splitLine(line, indentation);
    }
}

/**
 * Function used to split a line
 * 
 * @param line the line to split
 * @param indentation the indentation to add before each new line
 */
function splitLine(line: string, indentation: string){
    // Get all spaces where we can split
    const possibleSplittings = line.split(' ');

     // The actual line width
     let lineWidth = 0;
     // The last index where we cut
     let lastCut = 0;
     for (let j = 0; j < possibleSplittings.length; j++) {
         // We add the space (1) and the line width
         const newLineWidth = lineWidth + 1 + possibleSplittings[j].length;

         // If the line width is greater than the max
         // We take care of the spacing
         if (newLineWidth >= (options.maxLineLenght - indentation.length)) {
             // We get the index of the previous string
             const index = line.search(possibleSplittings[j - 1]) + possibleSplittings[j - 1].length;
             // We get the string to add between last and actual cut
             // We cut the index by 1 to delete space
             const toAdd = line.slice(lastCut, index);
             // The new with is the actual string length
             lineWidth = possibleSplittings[j - 1].length + possibleSplittings[j].length;
             formattedLines.push(`${indentation}${toAdd.trim()}`);

             lastCut = index;
         } else {
             lineWidth = newLineWidth;
         }
     }

     // We add the last string
     formattedLines.push(`${indentation}${line.slice(lastCut).trim()}`);

}

/**
 * Function used to manage an inline mark xml
 * 
 * @param line string to process
 * @param endMark the end mark of the xml
 */
function manageInLineMark(line: string, endMark: string){
    // We get the end of the start mark
    const endOfStartMark = line.indexOf(xmlEndMarkChar) + 1;
    // We get the start of the end mark
    const startOfEndMark = line.indexOf(endMark);

    // Get declarative mark
    const firstMark = line.slice(0, endOfStartMark);
    // Get closing mark
    const lastMark = line.slice(startOfEndMark);
    // Get the body between all marks
    const body = line.slice(endOfStartMark, startOfEndMark);

    // We check if we have other marks in the line
    const markInLine: number = line.search(xmlMarkInLineRegExp);

    // Check if we have the start mark
    if(body.search(xmlStartMarkRegExp) !== -1){
        // We create a temp indentation
        tempIndentation++;
        // We add the declarating mark
        addLine(firstMark);
        // We add the body
        processMark(body);
        // We add the closing mark
        addLine(lastMark);
        // We reset the indentation
        tempIndentation--;
    } else if(markInLine !== -1) {
        // We have here an other mark
        // Save actual indentation
        const temp = tempIndentation;
        // We process the first mark
        processMark(`${line.slice(0, markInLine + 1)}`);
        // We process the second one
        processMark(`${line.slice(markInLine + 1)}`);
        // Reset indentation
        tempIndentation = temp;
    } else {
        // Simple case: only an xml 
        // Increment indentation
        tempIndentation++;
        // We add the line with right format
        addLine(`${firstMark}${' '.repeat(options.spacesBetweenMarks)}${body.trim()}${' '.repeat(options.spacesBetweenMarks)}${lastMark}`);
        // Decrement indentation
        tempIndentation--;
    }
}
