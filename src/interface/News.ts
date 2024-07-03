export default class News{

    id?: number;
    title: string;
    text: string;
    date_pub?: Date;
    created_at?: Date;
    updated_at?: Date;

    constructor(title: string, text: string, id?: number){
        this.id = id;
        this.title = title;
        this.text = text;
    }

}