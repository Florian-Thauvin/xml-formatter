import { IXmlFormatting } from "./interfaces";

export const defaultParameters: IXmlFormatting = {
    endLineChar: '\r\n',
    indentation: '  ',
    maxLineLenght: 72,
    maxNumberOfBlankLines: 1
}

export const xmlStartMarkChar: string = '<';
export const xmlEndMarkChar: string = '>';
export const xmlCloseMarkChar: string = '</';

export const xmlCommentStartChar: string = '<!--'
export const xmlCommentEndChar: string = '-->';;

export const xmlStartMarkRegExp: RegExp = /<[^/!]/g;
export const xmlEndLineRegExp: RegExp = /\r?\n/gm;
export const xmlMarkInLineRegExp: RegExp = /></g;