import { writeXml } from "../src/utils/file-utils";
import { processXmlFile } from "../src/xml-format";

const path = require('path');
const fs = require('fs');

const EXAMPLES_PATHS = 'examples';

export function compareProcessToExpected(exampleNumber: number): void {
    const xml = processXmlFile(getExamplePath(exampleNumber));
    expect(xml).toStrictEqual(getExpectedXml(1));
    //writeXml(path.resolve(EXAMPLES_PATHS, `formatting_${exampleNumber}`, 'titi.xml'), xml);
}

export function getExamplePath(exampleNumber: number): string{
    return path.resolve(EXAMPLES_PATHS, `formatting_${exampleNumber}`, 'Input.xml');
}

export function getExpectedXml(exampleNumber: number): string{
    const expectedPath = path.resolve(EXAMPLES_PATHS, `formatting_${exampleNumber}`, 'Expected.xml');
    return fs.readFileSync(expectedPath, 'utf8');
}