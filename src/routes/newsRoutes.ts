import { Router } from "express";
import { createNews, deleteNews, getAllNews, getByIdNews, getByTitleNews, updateNews } from "../controller/newsController";

const router = Router();

router.get('', getAllNews);
router.get('/:id', getByIdNews);
router.get('/:title', getByTitleNews);
router.post('', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;