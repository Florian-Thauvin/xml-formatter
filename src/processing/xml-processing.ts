import * as LOGGER from '../utils/logger';
import { defaultParameters, xmlCloseMarkChar, xmlCommentEndChar, xmlCommentStartChar, xmlEndLineRegExp, xmlEndMarkChar, xmlMarkInLineRegExp, xmlStartMarkChar, xmlStartMarkRegExp } from '../model/parameters';
import { IXmlFormatting } from '../model/interfaces';

let formattedLines: string[];
let actualIndentation: number;
let lastIndentationIndex: number;
let xmlMarks: string[];

let tempIndentation: number;
let isMultiLineComment: boolean;

let numberOfBlankLines: number;
let options: IXmlFormatting;

export function processXmlString(rawXml: string, xmlOptions: IXmlFormatting = defaultParameters): string {
    resetGlobalVar();
    options = xmlOptions;

    const rawXmlByLines: string[] = rawXml.split(xmlEndLineRegExp);

    rawXmlByLines.forEach((line: string) => {
        LOGGER.debug('Process line', line);
        tempIndentation = 0;
        
        if (!isLineNotBlank(line)) {
            if(numberOfBlankLines < options.maxNumberOfBlankLines){
                formattedLines.push('');
                numberOfBlankLines++;
            }
        } else {
            numberOfBlankLines = 0;
            let processLine = supressIndentation(line);

            if (processLine.includes(getEndMark(xmlMarks[lastIndentationIndex]))) {
                removeLastMark();
            }

            // Comment
            if(processLine.includes(xmlCommentStartChar)){
                // Simple
                if(line.includes(xmlCommentEndChar)){
                    manageOneLineComment(processLine);
                } else {
                    isMultiLineComment = true;
                    addLine(xmlCommentStartChar, 1);
                }
            } else {
                if(processLine.includes(xmlCommentEndChar)){
                    isMultiLineComment = false;
                    addLine(xmlCommentEndChar, 1);

                    const lineWithoutEndComment = processLine.slice(processLine.indexOf(xmlCommentEndChar) + xmlCommentEndChar.length);
                    if(isLineNotBlank(lineWithoutEndComment)){
                        processMark(supressIndentation(lineWithoutEndComment));
                    }
                }
                else {
                   if(isMultiLineComment){
                    addLine(processLine, 2);
                   } else {
                    processMark(processLine);
                   }
                }
            }
        }

    });

    return formattedLines.join(options.endLineChar);
}

export function isLineNotBlank(line: string){
    return line && line.length > 0 && line.search(/\S/) !== -1;
}

export function resetGlobalVar(){
    formattedLines = [];
    xmlMarks = [];

    actualIndentation = -1;
    lastIndentationIndex = -1;
    numberOfBlankLines = 0;

    isMultiLineComment = false;
}

export function supressIndentation(line: string): string {
    return line.slice(line.search(/[^\s]/));
}

function removeLastMark(){
    actualIndentation--;
    xmlMarks.splice(lastIndentationIndex, 1);
    lastIndentationIndex--;
}

export function processMark(line: string) {
    if (line.includes(xmlStartMarkChar)) {
        const newMark: string = getXmlMark(line);

        if(newMark !== ''){
            const endMark = getEndMark(newMark);

            if (!line.includes(endMark)) {
                xmlMarks.push(newMark);
                actualIndentation++;
                lastIndentationIndex++;
                addLine(line);
            } else {
                manageInLineMark(line, endMark);
            }
        } else {
            tempIndentation++;
            addLine(line);
        }
    } else {
        tempIndentation += 2;
        addLine(line);
    }
}

export function getEndMark(mark: string) {
    return `${xmlCloseMarkChar}${mark}>`;
}

export function manageOneLineComment(line: string){
    const startCommentIndex: number = line.indexOf(xmlCommentStartChar);
    const endCommentIndex: number = line.indexOf(xmlCommentEndChar) + xmlCommentEndChar.length;

    const beforeComment = line.slice(0, startCommentIndex);
    const afterComment = line.slice(endCommentIndex);

    if(line.search(xmlStartMarkRegExp) !== -1) {
        if(isLineNotBlank(beforeComment)){
            processMark(beforeComment);
        }

        addLine(line.slice(startCommentIndex, endCommentIndex), 1);

        if(isLineNotBlank(afterComment)) {
            processMark(afterComment);
        }
    }
}

function addLine(line: string, optionnalSpacing: number = 0){
    formattedLines.push(`${options.indentation.repeat(actualIndentation + tempIndentation + optionnalSpacing)}${line}`);
}

function manageInLineMark(line: string, endMark: string){
    const endOfStartMark = line.indexOf(xmlEndMarkChar) + 1;
    const startOfEndMark = line.indexOf(endMark);

    const firstMark = line.slice(0, endOfStartMark);
    const lastMark = line.slice(startOfEndMark);
    const body = line.slice(endOfStartMark, startOfEndMark);

    const markInLine: number = line.search(xmlMarkInLineRegExp);
    if(body.search(xmlStartMarkRegExp) !== -1){
        tempIndentation++;
        addLine(firstMark);
        processMark(body);
        addLine(lastMark);
        tempIndentation--;
    } else if(markInLine !== -1) {
        const temp = tempIndentation;
        processMark(`${line.slice(0, markInLine + 1)}`);
        processMark(`${line.slice(markInLine + 1)}`);
        tempIndentation = temp;
    } else {
        tempIndentation++;
        addLine(line);
        tempIndentation--;
    }
}

export function getXmlMark(line: string): string {
    let toReturn = '';
    const startLineIndex = line.search(xmlStartMarkRegExp);

    if (startLineIndex != -1) {
        const firstSpaceIndex: number = line.search(/\s/);
        const firstEndMarkIndex: number = line.indexOf(xmlEndMarkChar);
        let endMarkIndex: number;

        if (firstSpaceIndex !== -1) {
            if (firstEndMarkIndex !== -1) {
                endMarkIndex = firstSpaceIndex < firstEndMarkIndex ? firstSpaceIndex : firstEndMarkIndex;
            } else {
                endMarkIndex = firstSpaceIndex;
            }
        } else {
            endMarkIndex = firstEndMarkIndex;
        }

        toReturn = line.slice(startLineIndex + 1, endMarkIndex)
    }
    return toReturn;
}
