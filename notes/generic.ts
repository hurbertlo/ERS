// 最入門既generic

let taskList: Array<string> = ["睇preview", "做ex"];

/* --------------------------------------- */
/* --------------------------------------- */
/* Example 1 */

const getLast = (inputArr: any[]) => {
    if (inputArr.length > 0) {
        return inputArr[inputArr.length - 1];
    }
    return null;
};

const getLastGeneric = <T>(inputArr: T[]): T | null => {
    if (inputArr.length > 0) {
        return inputArr[inputArr.length - 1];
    }
    return null;
};

let charArr = ["A", "B", "C"];
// 可以寫到明 generic of 乜 type
// 又或者叫ts 自己infer
// let charLastGeneric = <string>getLastGeneric(charArr);
let charLastGeneric = <string>getLastGeneric(charArr);
let charLastAny = getLast(charArr);

/* --------------------------------------- */
/* --------------------------------------- */
/* Example 2.1 */
const createArr = (x: any) => {
    return [x];
};
const arr1 = createArr(100);

/* Example 2.2 */
const createArr_oneGeneric = <X>(x: X) => {
    return [x];
};
const arr2 = createArr_oneGeneric(100);

/* Example 2.3 */
const createArr_twoGeneric = <X, Y>(x: X, y: Y) => {
    return [x, y];
};
const arr3 = createArr_twoGeneric(100, "A");
const arr4 = createArr_twoGeneric<number, string | null>(100, "A");

/* Example 2.4 */
const createArr_twoGenericWithDefault = <X, Y = string>(x: X, y: Y) => {
    return [x, y];
};
const arr5 = createArr_twoGenericWithDefault<number>(100, "A");
/* --------------------------------------- */
/* --------------------------------------- */
/* Example 3.1 */
interface Student {
    firstName: string;
    lastName: string;
    age: number;
    lang: string;
}
let james: Student = {
    firstName: "james",
    lastName: "lam",
    age: 20,
    lang: "js",
};
function makeName(student: Student) {
    return {
        ...student,
        fullName: `${student.firstName} ${student.lastName}`,
    };
}

const jamesWithFullName = makeName(james);

/* Example 3.2 */

function makeNameGeneric<T extends Student>(student: T) {
    return {
        ...student,
        fullName: `${student.firstName} ${student.lastName}`,
    };
}

const jamesWithFullNameGeneric = makeName(james);
/* --------------------------------------- */
/* --------------------------------------- */
/* Example 3.2 */

interface Player<T> {
    name: string;
    level: number;
    age: number;
    leftHand: T;
}

type MagicHand = {
    magicalAttack: number;
    spell: string;
};

type StoneHand = {
    physicalAttack: number;
    power: number;
};

type Wizard = Player<MagicHand>;
type Blade = Player<StoneHand>;

let wizard: Wizard = {
    name: "Newbie",
    level: 0,
    age: 29,
    leftHand: {
        magicalAttack: 200,
        spell: "tecky tecky 魔法泡泡",
    },
};
console.log(wizard);
