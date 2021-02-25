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
    
    /*it("test", async () => {
        const a = path.resolve(getExamplePath(1));
        console.log(a);
        const b = await processXmlFile(a);
        console.log(b);
    });*/
});