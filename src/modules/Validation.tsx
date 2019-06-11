const PASSWORD_MAX_LENGTH = 32;
// a
const LOWER_CHARACTER_RANGE_UTF16_INDEX = 97;
// z
const UPPER_CHARACTER_RANGE_UTF16_INDEX = 122;
// i, O, I
const INVALID_CHARACTERS_UTF16_INDEX_LIST = [105, 79, 73];

const characterInRange = (char: string): boolean => {
    return char.charCodeAt(0) >= LOWER_CHARACTER_RANGE_UTF16_INDEX && char.charCodeAt(0) <= UPPER_CHARACTER_RANGE_UTF16_INDEX;
}

const isValidCharacter = (char: string): boolean => {
    return !INVALID_CHARACTERS_UTF16_INDEX_LIST.includes(char.charCodeAt(0));
}

const straightCheck = (str: string, index: number) => {
    const lookAhead: number = 2;
    const lastCheckIndex: number = index + lookAhead;
    const enoughCharactersLeft: boolean = lastCheckIndex <= (str.length - 1);

    let check: boolean = false;

    if (enoughCharactersLeft) {
        for (let i = index; i < lastCheckIndex; i++) {
            if (str[i].charCodeAt(0) + 1 === str[i + 1].charCodeAt(0)) {
                if (i === lastCheckIndex - 1) {
                    return true;
                }
            } else {
                break;
            }
        }
    }

    return false;
}

const consecutiveCheck = (str: string, index: number) => {
    const lookAhead: number = 1;
    const lastCheckIndex: number = index + lookAhead;
    const enoughCharactersLeft: boolean = lastCheckIndex <= (str.length - 1);

    if (enoughCharactersLeft) {
        for (let i = index; i < lastCheckIndex; i++) {
            if (str[i] === str[i + 1]) {
                if (i === lastCheckIndex - 1) {
                    return true;
                }
            } else {
                break;
            }
        }
    }

    return false;
}

const validate = (username: string, password: string):boolean => {
    const userNameCheck = username !== '';
    const lengthCheck = password.length <= PASSWORD_MAX_LENGTH;

    let straight: boolean = false;
    let consecutive: boolean = false;

    if (userNameCheck && lengthCheck) {

        for (let i = 0; i < password.length; i++) {
            if (!characterInRange(password[i])) break;
            if (!isValidCharacter(password[i])) break;
            if (!straight && straightCheck(password, i)) straight = true;
            if (!consecutive && consecutiveCheck(password, i)) consecutive = true;
        }

    }

    return straight && consecutive;
}

export default validate;