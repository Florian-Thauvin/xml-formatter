# XML Formatter

## Description
This is a xml formatter. Can be used to format a xml

## Restrictions 
- Only for valid xml files.
- Doesn't manage CDATA

## Options
You can set following options:
- endLineChar, separator between each lines, \r\n by default
- indentation, string used to indent a line, double space by default
- maxLineLenght, maxLineLenght, 120 by default
- maxNumberOfBlankLines, max number of blanks lines alloweds between two lines, 1 by default
- maxNumberOfSpaces, max number of spaces between two char (doesn't affect indentation), 1 by default
- spacesBetweenMarks, space between a mark declaration and his body, 1 by default

## Commands
- build, used to compile project to a single file in build directory
- clean, used to clean and test project
- complexity, used to generate a complexity report file
- complexity:ui, used to open a complexity report server
- deploy, used to clean and build the project
- duplication, used to detect code duplication
- lint, used to pass coding rules
- prettier, to format all files
- publish, used to publish project to npm (need a deploy before)
- test, to run all tests