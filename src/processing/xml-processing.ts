import * as LOGGER from '../utils/logger';
import { defaultParameters, xmlCloseMarkChar, xmlEndLineRegExp, xmlEndMarkChar, xmlStartMarkChar, xmlStartMarkRegExp } from '../model/parameters';
import { IXmlFormatting } from '../model/interfaces';

export function processXmlString(rawXml: string, xmlOptions: IXmlFormatting = defaultParameters): string {
    const rawXmlByLines: string[] = rawXml.split(xmlEndLineRegExp);
    const formattedLines: string[] = [];

    let actualIndentation = -1;
    let lastIndentationIndex = -1;
    const xmlMarks: string[] = [];

    rawXmlByLines.forEach((line: string) => {
        LOGGER.debug('Process line', line);

        if (line.search(/\S/) === -1) {
            formattedLines.push('');
        } else {
            let processLine = supressIndentation(line);

            let tempIndentation = 0;

            if (processLine.includes(getEndMark(xmlMarks[lastIndentationIndex]))) {
                actualIndentation--;
                xmlMarks.splice(lastIndentationIndex, 1);
                lastIndentationIndex--;
            }

            if (line.includes(xmlStartMarkChar)) {
                const newMark: string = getXmlMark(processLine);

                if (newMark !== '' && !line.includes(getEndMark(newMark))) {
                    xmlMarks.push(newMark);
                    actualIndentation++;
                    lastIndentationIndex++;
                    LOGGER.debug('Add new xml mark', newMark, actualIndentation);
                } else {
                    tempIndentation++;
                }
            } else {
                tempIndentation += 2;
            }
            formattedLines.push(`${xmlOptions.indentation.repeat(actualIndentation + tempIndentation)}${processLine}`);
        }

    });

    return formattedLines.join(xmlOptions.endLineChar);
}

export function getEndMark(mark: string) {
    return `${xmlCloseMarkChar}${mark}>`;
}

export function supressIndentation(line: string): string {
    return line.slice(line.search(/[^\s]/));
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

        toReturn = line.slice(+ 1, endMarkIndex)
    }
    return toReturn;
}