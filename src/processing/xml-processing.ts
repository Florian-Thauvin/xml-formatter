import * as LOGGER from '../utils/logger';
import { defaultParameters, xmlCloseMarkChar, xmlEndLineRegExp, xmlEndMarkChar, xmlMarkInLineRegExp, xmlStartMarkChar, xmlStartMarkRegExp } from '../model/parameters';
import { IXmlFormatting } from '../model/interfaces';

let formattedLines: string[];
let actualIndentation: number;
let lastIndentationIndex: number;
let xmlMarks: string[];
let tempIndentation: number;

let options: IXmlFormatting;

export function processXmlString(rawXml: string, xmlOptions: IXmlFormatting = defaultParameters): string {
    resetGlobalVar();
    options = xmlOptions;

    const rawXmlByLines: string[] = rawXml.split(xmlEndLineRegExp);

    rawXmlByLines.forEach((line: string) => {
        LOGGER.debug('Process line', line);
        tempIndentation = 0;
        
        if (line.search(/\S/) === -1) {
            formattedLines.push('');
        } else {
            let processLine = supressIndentation(line);

            if (processLine.includes(getEndMark(xmlMarks[lastIndentationIndex]))) {
                removeLastMark();
            }

            processMark(processLine);
        }

    });

    return formattedLines.join(options.endLineChar);
}

export function resetGlobalVar(){
    formattedLines = [];
    actualIndentation = -1;
    lastIndentationIndex = -1;
    xmlMarks = [];
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
                    //removeLastMark();
                } else {
                    tempIndentation++;
                    addLine(line);
                    tempIndentation--;
                }
                
            }
        } else {
            // tester la ligne de commentaire
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

function addLine(line: string){
    formattedLines.push(`${options.indentation.repeat(actualIndentation + tempIndentation)}${line}`);
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