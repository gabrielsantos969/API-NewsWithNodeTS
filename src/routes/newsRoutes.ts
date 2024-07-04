import { Router } from "express";
import { createNews, deleteNews, getAllNews, getByIdNews, getByTitleNews, updateNews } from "../controller/newsController";

const router = Router();

router.get('', getAllNews);
router.get('/getById/:id', getByIdNews);
router.get('/getByTitle/:title', getByTitleNews);
router.post('', createNews);
router.put('/update/:id', updateNews);
router.delete('/delete/:id', deleteNews);

export default router;