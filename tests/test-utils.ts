/**
 * Xml formatter
 * 
 * @author Florian Thauvin
 * @license MIT
 */

import { IXmlFormatting } from "../src/model/interfaces";
import { writeXml } from "../src/utils/file-utils";
import { processXmlFile } from "../src/xml-format";

const path = require('path');
const fs = require('fs');

const EXAMPLES_PATHS = 'tests/resources';

export function compareProcessToExpected(exampleNumber: number, options?: IXmlFormatting): void {
    const xml = processXmlFile(getExamplePath(exampleNumber), options);
    writeXml(path.resolve(EXAMPLES_PATHS, `formatting_${exampleNumber}`, 'test_result.xml'), xml);
    expect(xml).toStrictEqual(getExpectedXml(exampleNumber));
}

export function getExamplePath(exampleNumber: number): string{
    return path.resolve(EXAMPLES_PATHS, `formatting_${exampleNumber}`, 'Input.xml');
}

export function getExpectedXml(exampleNumber: number): string{
    const expectedPath = path.resolve(EXAMPLES_PATHS, `formatting_${exampleNumber}`, 'Expected.xml');
    return fs.readFileSync(expectedPath, 'utf8');
}