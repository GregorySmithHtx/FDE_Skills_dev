class Term {
    constructor(term_id, name, category, source_title, source_author,definition, ) {
        this.term_id = term_id;
        this.name = name;
        this.category = category;
        this.source = {
            title: source_title,
            author: source_author
        };
        this.definition = definition || "Base";
        this.getTermId = () => this.term_id;
        this.getName = () => this.name;
        this.getCategory = () => this.category;
        this.getSource = () => this.source;
        this.setSource = (title, author) => {
            this.source.title = title;
            this.source.author = author;
        }
    }
    
    

};

let Athena = new Term(1, "Athena", "Greek Mythology", "The Iliad", "Homer");
const {name, category} = Athena; //
let {title} = Athena.source; //

let getTerm = ({name,category} = {})=>{return name + "(category: " + category + ")"}

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