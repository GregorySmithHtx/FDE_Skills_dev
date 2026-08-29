export {getTerm};

class Term {
    source: {title: string, author: string};
    getTermId: () => number;
    getName: () => string;
    getSource: () => object;
    getCategory: () => string;
    setSource: (title: string, author: string) => void;

constructor(public term_id: number, 
    public name: string, 
    public category: string, 
    source_title: string, 
    source_author: string,
    public definition: string,
    ) {
        
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

let getTerm = ({name,category}: {name?: string, category?: string} = {})=>{return name + "(category: " + category + ")"}

export default Term;
