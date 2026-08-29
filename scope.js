import Term, {getTerm} from"../FDE_Skills_dev/term.js"

let Athena = new Term(1, "Athena", "Greek Mythology", "The Iliad", "Homer");
const {name, category} = Athena; //
let {title} = Athena.source; //

console.log(getTerm(), title);
let terms = [Athena];

let [a,b] = ["Medium","Lodge"];
[a,b] = [b,a];
console.log(a,b)



let getTermsById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = terms.filter((t) => t.term_id == id).pop()
            resolve(result||null)
            
        }, 500);
    });
};

let t1 = getTermsById(1).then(result=>console.log(result))
let t2 = getTermsById(2).then(result=>console.log(result))