import express from "express";
import * as UserController from "../controllers/user";
import * as GroupController from "../controllers/group";
import * as PairController from "../controllers/pair";

const router = express.Router();

router.post("/user", UserController.createUser);
router.get("/user/:id", UserController.getUserById);
router.get("/user", UserController.getAllUsers);

router.post("/group", GroupController.createGroup);
router.post("/group/subgroup", GroupController.addSubGroup);
router.get("/group/:id", GroupController.getGroupById);
router.get("/group", GroupController.getAllGroups);

router.post("/pair/add", PairController.addPair);
router.post("/pair", PairController.addTransaction);
router.post("/pair/update", PairController.updateRequest);
router.post("/pair/delete", PairController.deleteTransaction);
router.post("/pair/split", PairController.splitTransaction);

export default router;
