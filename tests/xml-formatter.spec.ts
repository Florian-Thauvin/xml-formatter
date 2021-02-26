import { NOT_FOUND } from '../src/model/exceptions';
import { readXml } from '../src/utils/file-utils';
import { compareProcessToExpected, getExamplePath } from './test-utils';
const path = require('path');

describe("Xml formatters tests", () => {
    it("Wrong xml path, expect error", async () => {
        try{
            readXml('non-valid-path');
        } catch(exception){
            expect(exception).toStrictEqual(new Error(NOT_FOUND));
        }
    });

    it("Simple file parsing, test 1", async () => {
        compareProcessToExpected(1);
    });

    it("File with multi mark in line parsing, test 2", async () => {
        compareProcessToExpected(2);
    });

    it("File with comments and empty spaces, test 3", async () => {
        compareProcessToExpected(3);
    });
});