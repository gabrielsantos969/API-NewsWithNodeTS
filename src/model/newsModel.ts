import News from '../interface/News';
import con from '../config/connect';
import { RowDataPacket } from 'mysql2';

interface NewsRow extends RowDataPacket, Omit<News, 'constructor'> {};
interface TotalNews extends RowDataPacket {
    total: number;
}

const newsGetAll = async (page: number, limitQuery: number, filters?: any): Promise<News[] | null> => {

    let rows;

    const limit = limitQuery || 50;
    const offset = (page - 1) * limit;

    const setFilters = [];
    const values = [];

    if(filters.title){
        setFilters.push("title=?");
        values.push(filters.title);
    }

    if(setFilters.length > 0){
        [rows] = await con.promise().query<NewsRow[]>(`SELECT * FROM news WHERE ${setFilters.join("AND ")} LIMIT ? OFFSET ?`, [values, limit, offset]);
    }else{
        [rows] = await con.promise().query<NewsRow[]>("SELECT * FROM news LIMIT ? OFFSET ?", [limit, offset]);
    }


    if(rows.length > 0){
        return rows.map(row => {
            const news = new News(row.title, row.text, row.id);
            news.date_pub = row.date_pub;
            return news;
        })
    }

    return null;

}

const totalNews = async (): Promise<number> => {
    const [rows] = await con.promise().query<TotalNews[]>("SELECT COUNT(*) as total FROM news");

    const { total } = rows[0];
    return total;
}

const newsGetById = async (id: number): Promise<News[] | null> => {

    const [rows] = await con.promise().query<NewsRow[]>("SELECT * FROM news WHERE id=?", [id]);

    if(rows.length > 0){
        return rows.map(row => {
            const news = new News(row.title, row.text, row.id);
            news.date_pub = row.date_pub;
            return news;
        })
    }

    return null;

}

const newsGetByTitle = async (title: string): Promise<News[] | null> => {

    const [rows] = await con.promise().query<NewsRow[]>(`SELECT * FROM news WHERE title LIKE '%${title}%'`);

    if(rows.length > 0){
        return rows.map(row => {
            const news = new News(row.title, row.text, row.id);
            news.date_pub = row.date_pub;
            return news;
        })
    }

    return null;

}

const newsCreate = async (data: News, categoryIds: number[]): Promise<void> => {

    const [categories]: any = await con.promise().query("SELECT * FROM category WHERE id IN (?)", categoryIds);
    const existCageryIds = categories.map((category: any) => category.id);

    if(existCageryIds.length !== categoryIds.length){
        throw new Error('One or more categories do not exist.');
    }

    const values = [data.title, data.text];
    const [result]: any = await con.promise().query("INSERT INTO news (title, text) VALUES (?,?)", values);

    const newsId = result.insertId;

    const newsCategoryValues = categoryIds.map((categoryId: any) => [newsId, categoryId]);
    await con.promise().query("INSERT INTO category_news (id_news, id_category) VALUES ?", [newsCategoryValues]);

}

const newsUpdate = async (id: number, data:News): Promise<void> => {

    const setClause = [];
    const values = [];

    if(data.title){
        setClause.push("title=?");
        values.push(data.title);
    }

    if(data.text){
        setClause.push("text=?");
        values.push(data.text);
    }

    if(setClause.length === 0) {
        throw new Error("No data was provided to update the news.");
    }

    values.push(id);

    await con.promise().query(`UPDATE news SET ${setClause.join(", ")} WHERE id=?`);

}

const newsCategoryUpdate = async (id: number, categoryIds: number[]): Promise<void> => {

    const [categories]: any = await con.promise().query("SELECT * FROM category WHERE id IN (?)", categoryIds);
    const existCageryIds = categories.map((category: any) => category.id);

    if(existCageryIds.length !== categoryIds.length){
        throw new Error('One or more categories do not exist.');
    }

    const [currentCategories]: any = await con.promise().query("SELECT * FROM category_news WHERE id_news = ?", [id]);
    const currentCategoryIds: number[] = currentCategories.map((category: any) => category.id);

    const categoriesToAdd = existCageryIds.filter((idCategory: number) => !currentCategoryIds.includes(idCategory));
    const categoriesToRemove = currentCategoryIds.filter((idCategory: number) => !existCageryIds.includes(idCategory));

    if(categoriesToAdd.length > 0){
        const categoriesNewsValuesToAdd = categoriesToAdd.map((categoryId: number) => [id, categoryId]);
        await con.promise().query("INSERT INTO category_news (id-news, id_category) VALUES ?", [categoriesNewsValuesToAdd]);
    }
    if(categoriesToRemove.length > 0) {
        await con.promise().query("DELETE FROM category_news WHERE id_news AND id_category IN (?)", [id, categoriesToRemove]);
    }

}

const newsDelete = async (id: number): Promise<void> => {

    await con.promise().query("DELETE FROM news WHERE id=?", [id]);

}

export { newsGetAll, totalNews, newsGetById, newsGetByTitle, newsCreate, newsUpdate, newsCategoryUpdate, newsDelete, News };