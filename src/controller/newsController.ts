import { Request, Response } from "express";
import { newsCategoryUpdate, newsCreate, newsDelete, newsGetAll, newsGetById, newsGetByTitle, newsUpdate, totalNews } from "../model/newsModel";
import sendResponse from "../utils/sendResponse";

async function getAllNews(req: Request, res: Response) {

    let message = '';
    const page = parseInt(req.query.page as string) | 1;
    const limit = 50;

    try {

        const news = await newsGetAll(page, limit, req.query);

        const total = await totalNews();

        const totalPages = Math.ceil(total / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        if(!news){
            message = 'No News Registred.';
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(news){
            message = `${news.length} news.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: news,
                page: page,
                totalPages: totalPages,
                nextPage: nextPage ? `/v1/getAllNews?page=${nextPage}` : null,
                prevPage: prevPage ? `/v1/getAllNews?page=${prevPage}` : null
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to list all news.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }
}

async function getByIdNews(req: Request, res: Response) {
    
    let message = '';
    const {
        id
    } = req.params;

    try {

        const news = await newsGetById(Number(id));
        
        if(!news){
            message = 'News not found';
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }
        if(news){
            message = `News ID: ${id} found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: news
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to list by id news.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

async function getByTitleNews(req: Request, res: Response) {
    
    let message = '';
    const {
        title
    }=req.params;

    try {

        const news = await newsGetByTitle(title);
        
        if(!news){
            message = 'News not found';
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }
        if(news){
            message = `News Title: ${title} found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: news
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to list by title news.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

async function createNews(req: Request, res: Response) {
    
    let message = '';
    const {
        data,
        category
    } = req.body;

    try {

        if(data.title.length == 0 || data.title == null || data.title == undefined || data.title.trim().equals("")){
            message = "The 'title' field is required.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else if(data.text.length == 0 || data.title == null || data.title == undefined || data.title.trim().equals("")){
            message = "The 'post' field is required.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else if(data.text.length < 100 ){
            message = "The 'post' field needs at least 100 characters.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else if(category.length == 0){
            message = "The 'category' field is required.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else{

            await newsCreate(data, category);

            message = 'News published successfully.';
            sendResponse({
                res,
                success: true,
                statusCode: 201,
                message: message
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        let errorCode: string | undefined
        if(err instanceof Error){
            errorMessage = err.message;
            if('code' in err){
                errorCode = (err as any).code;
            }
        }

        if(errorCode === "ER_DUP_ENTRY"){
            message = 'Duplication error when registering the product.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
            message = 'Error when trying to update news.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }

    }

}

async function updateNews(req: Request, res: Response) {
    
    let message = '';
    const{
        data,
        categoryIds
    }=req.body;
    const{
        id
    }=req.params;

    try {

        const news = await newsGetById(Number(id));
        
        if(!news){
            message = 'News not found';
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if (!data && !categoryIds) {
            throw new Error('No data provided to update.');
        }

        if (data && categoryIds) {
            await newsUpdate(Number(id), data);
            await newsCategoryUpdate(Number(id), categoryIds);
            message = 'News updated successfully.';
        }else if (categoryIds) {
            await newsCategoryUpdate(Number(id), categoryIds);
            message = 'News updated successfully.';
        }else if(data){
            await newsUpdate(Number(id), data);
            message = 'News updated successfully.';
        }

        sendResponse({
            res,
            success: true,
            statusCode: 200,
            message: message
        })
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        let errorCode: string | undefined
        if(err instanceof Error){
            errorMessage = err.message;
            if('code' in err){
                errorCode = (err as any).code;
            }
        }

        if(errorCode === "ER_DUP_ENTRY"){
            message = 'Duplication error when registering the product.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
            message = 'Error when trying to update news.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }

    }

}

async function deleteNews(req: Request, res: Response) {
    
    let message = '';
    const {
        id
    }=req.params;

    try {

        const news = await newsGetById(Number(id));
        
        if(!news){
            message = 'News not found';
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(news){
            await newsDelete(Number(id));
            message = `News ID: ${id} deleted successfully.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to delete news.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

export { getAllNews, getByIdNews, getByTitleNews, createNews, updateNews, deleteNews };