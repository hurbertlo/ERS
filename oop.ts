class TeckyStudent {
    name: string;
    constructor(private skillLevel: number, private favLang: string, name: string) {
        this.name = name;
    }

    coding() {}

    getSkillLevel() {
        return this.skillLevel;
    }
}


let student1 = new TeckyStudent(50, "js", "dickson");
let student2 = new TeckyStudent(50, "js", "dickson");
let student3 = new TeckyStudent(50, "js", "dickson");
let student4 = new TeckyStudent(50, "js", "dickson");


function makeStudent(skillLevelInput: number, favLangInput: string, nameInput: string) {
    let skillLevel = skillLevelInput;
    let favLang = favLangInput;
    let name = nameInput;
    return {
        name: "",
        coding: () => {
            console.log("coding now");
        },
        getSkillLevel: () => {
            return skillLevel;
        },
    };
}

let student5 = makeStudent(50, "js", "dickson");
let student6 = makeStudent(50, "js", "dickson");



cat.html


[module]cat.js   
        Headers.js
        footer.js
        common.js
        /entity/basket.js