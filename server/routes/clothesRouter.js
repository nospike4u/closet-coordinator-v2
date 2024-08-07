import { Router } from "express";
import {
  getAllClothes,
  getOneClothes,
  createClothes,
  updateClothes,
  deleteClothes,
  getClothesByCategory,
} from "../controllers/clothesControllers.js";

import {
  // isAdmin,
  isAuthenticated,
  // isOwnerOrAdmin,
} from "../middlewares/authMiddlewares.js";

const router = Router();

// router.get('/', isAuthenticated, getAllUsers);
router.get("/", getAllClothes);
router.post("/", createClothes);
router.get("/", getAllClothes);
router.post("/", createClothes);
// router.use(isAuthenticated, isOwnerOrAdmin);
// router.use(isAuthenticated, isOwnerOrAdmin);
router
  .route(`/:id`)
  .get(getOneClothes)
  .put(updateClothes)
  .delete(deleteClothes);

router.get("/category/:category", getClothesByCategory);

export default router;
