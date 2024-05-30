import { Router } from "express";
import { createBlog ,fetchAllBlogs, fetchBlogsByUser, updateBlog, deleteBlog, fetchBlogById} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/blogs").post(verifyUser,upload.single("coverImage"),createBlog);
router.route('/blogs').get(verifyUser, fetchAllBlogs);


router.route('/blogs/user').get(verifyUser,fetchBlogsByUser);

router.route('/blogs/:id').put(verifyUser, updateBlog);

router.route('/blogs/:id').get(verifyUser,fetchBlogById)
router.route('/blogs/:id').delete(verifyUser, deleteBlog);
export default router 