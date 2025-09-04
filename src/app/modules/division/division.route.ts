import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { createCategorySchema, updateCategorySchema } from "../category/category.validation";
import { CategoryController } from "../category/category.controller";

const router = Router()
/*
 {

 file : Image
 data : body text data => req.body => req.body.data
 }
*/
// Form data -> body, file
router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single("file"),
    validateRequest(createCategorySchema),
    CategoryController.createCategory
);
router.get("/", CategoryController.getAllCategories);
router.get("/:slug", CategoryController.getSingleCategory);
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single("file"),
    validateRequest(updateCategorySchema),
    CategoryController.updateCategory
);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router