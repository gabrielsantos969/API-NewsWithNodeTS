import { Response } from "express"

interface SendResponseParams{
    res: Response,
    success: boolean,
    statusCode: number,
    message: string,
    data?: any,
    error?: string,
    page?: any,
    totalPages?: any,
    nextPage?: any,
    prevPage?: any
}

function sendResponse({res, success, statusCode, message, data, error, page, totalPages, nextPage, prevPage}: SendResponseParams): void {
    const result: {
        page?: any,
        totalPages?: any,
        nextPage?: any,
        prevPage?: any,
        message: string,
        success: boolean,
        status: number,
        data?: any,
        error?: any
    } = {
        message,
        success,
        status: statusCode
    }

    if(page) result.page = page;
    if(totalPages) result.totalPages = totalPages;
    if(nextPage) result.nextPage = nextPage;
    if(prevPage) result.prevPage = prevPage;

    if(data) result.data = data;
    if(error) result.error = error;

    res.header("Access-Control-Allow-Origin", "*");
    res.status(statusCode).json(result);

}
export default sendResponse;