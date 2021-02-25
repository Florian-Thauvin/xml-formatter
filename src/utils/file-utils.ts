import { NOT_FOUND, WRITING } from "../model/exceptions";

const fs = require('fs');

export function readXml(xmlPath: string): string{
	let rawXml: string;

	try {
	  rawXml = fs.readFileSync(xmlPath, 'utf8');
	} catch (exception) {
	  console.error(`Error during reading file ${xmlPath}`, exception);
	  throw new Error(NOT_FOUND);
	}

	return rawXml;
}

export function writeXml(xmlPath: string, content: string){
	try {
		fs.writeFileSync(xmlPath, content, 'utf8');
	} catch (exception) {
		console.error(`Error during writing file ${xmlPath}`, exception);
		throw new Error(WRITING);
	  }
}