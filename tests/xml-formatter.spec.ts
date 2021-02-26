/**
 * Xml formatter
 * 
 * @author Florian Thauvin
 * @license MIT
 */

import { READING_EXCEPTION, WRITING_EXCEPTION } from '../src/model/exceptions';
import { readXml, writeXml } from '../src/utils/file-utils';
import { compareProcessToExpected } from './test-utils';

describe("Xml formatters tests", () => {
    it("Wrong xml path reading, expect error", async () => {
        try{
            readXml('non-valid-path');
            fail();
        } catch(exception){
            expect(exception).toStrictEqual(new Error(READING_EXCEPTION));
        }
    });

    it("Simple file parsing, test 1", async () => {
        compareProcessToExpected(1);
    });

    it("File with multi mark in line parsing, test 2", async () => {
        compareProcessToExpected(2);
    });

    it("File with comments and empty lines, test 3", async () => {
        compareProcessToExpected(3);
    });

    it("File with empty spaces, test 4", async () => {
        compareProcessToExpected(4, {spacesBetweenMarks: 1});
    });

    it("Wrong xml path writing, expect error", async () => {
        try{
            writeXml('non-valid-path/non-valid-file', '');
            fail();
        } catch(exception){
            expect(exception).toStrictEqual(new Error(WRITING_EXCEPTION));
        }
    });
});