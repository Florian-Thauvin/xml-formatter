/**
 * Xml formatter
 *
 * @author Florian Thauvin
 * @license MIT
 */

 import { processXmlFile } from './xml-format';
 import * as IExceptions from './model/exceptions';
 import { IXmlFormatting } from './model/interfaces';
 import { processXmlString } from './processing/xml-processing';

export type { IXmlFormatting };
export {processXmlFile, processXmlString, IExceptions};
