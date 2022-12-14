import { readFileSync } from 'fs';

const inputFile = 'input.txt';

const input: string = readFileSync(inputFile, 'utf-8').replace(/\r/g, '');

/**
 * \\ (which represents a single backslash), 
 * \" (which represents a lone double-quote character), 
 * \x plus two hexadecimal characters (which represents a single character with that ASCII code).
 */

function part01() {
    function lengthInMemory(inputStr: string): number {
        let memoryLength: number = inputStr.length-2; //-2 to not count the quotes

        for (let i=1; i<inputStr.length-1; i++) {
            let currChar = inputStr.charAt(i);
            if (currChar === '\\') {
                let nextChar = inputStr.charAt(i+1);
                switch (nextChar) {
                    case '\\':
                        memoryLength--;
                        // prevent double escape char
                        i++;
                        break;
                    case '"':
                        memoryLength--;
                        break;
                    case 'x':
                        memoryLength -= 3;
                        break;
                }
            }
        }

        return memoryLength;
    }

    function calcMemoryDifferences(inputs: string[]): number {
        let numOfChars: number = 0;
        let numInMemory: number = 0;

        inputs.forEach( (str: string) => {
            numOfChars += str.length;
            numInMemory += lengthInMemory(str);
        } );

        return numOfChars-numInMemory;
    }

    const inputStrings: string[] = input.split('\n');
    const result: number = calcMemoryDifferences(inputStrings);

    console.log(result);
}

function part02() {
    function strEncodedLength(inputStr: string): number {
        // +2 since we're adding double quotes to each strings head and tail
        let encodedLength: number = inputStr.length+2; 

        for (let i=0; i<inputStr.length; i++) {
            let currChar = inputStr.charAt(i);
            if (currChar === '"') {
                encodedLength++;
            } else if (currChar === '\\') {
                encodedLength++;
            }
        }

        return encodedLength;
    }

    function calcMemoryDifferences(inputs: string[]): number {
        let originalChars: number = 0;
        let numInCode: number = 0;

        inputs.forEach( (str: string) => {
            originalChars += str.length;
            numInCode += strEncodedLength(str);
        } );

        return numInCode-originalChars;
    }

    const inputStrings: string[] = input.split('\n');
    const result: number = calcMemoryDifferences(inputStrings);

    console.log(result);
}

//part01();
part02();
