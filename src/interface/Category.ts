export default class Category {

    id?: number;
    name: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(name: string, id?: number){
        this.id = id;
        this.name = name;
    }

}