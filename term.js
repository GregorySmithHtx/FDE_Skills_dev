export { getTerm };
class Term {
    term_id;
    name;
    category;
    definition;
    source;
    getTermId;
    getName;
    getSource;
    getCategory;
    setSource;
    constructor(term_id, name, category, source_title, source_author, definition) {
        this.term_id = term_id;
        this.name = name;
        this.category = category;
        this.definition = definition;
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
        };
    }
}
;
let getTerm = ({ name, category } = {}) => { return name + "(category: " + category + ")"; };
export default Term;
