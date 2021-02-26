/**
 * Xml formatter
 * 
 * @author Florian Thauvin
 * @license MIT
 */

import { getEndMark, getXmlMark, supressIndentation } from "../src/utils/string-utils";

describe("Xml processing tests", () => {
    it('supressIndentation', () => {
        const toProcess = "titi";
        expect(supressIndentation(toProcess)).toBe(toProcess);
        expect(supressIndentation(`   ${toProcess}`)).toBe(toProcess);
        expect(supressIndentation(`  a ${toProcess}`)).toBe(`a ${toProcess}`);
        expect(supressIndentation(`   ${toProcess}   `)).toBe(`${toProcess}   `);
    });

    it('getXmlMark', () => {
        expect(getXmlMark('<titi>')).toBe('titi');
        expect(getXmlMark('<titi abc>')).toBe('titi');
        expect(getXmlMark('<titi> abc')).toBe('titi');
        expect(getXmlMark('<titi>abc')).toBe('titi');
    });

    it('getEndMark', () => {
        expect(getEndMark('titi')).toBe('</titi>');
    });
});