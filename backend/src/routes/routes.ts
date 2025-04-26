import express from "express";
import * as UserController from "../controllers/user";
import * as GroupController from "../controllers/group";

const router = express.Router();

router.post("/user", UserController.createUser);
router.get("/user/:id", UserController.getUserById);
router.get("/user", UserController.getAllUsers);
router.post("/user/payment/:id", UserController.payGroup);

router.post("/group", GroupController.createGroup);
router.get("/group/:id", GroupController.getGroupById);
router.get("/group", GroupController.getAllGroups);
router.post("/group/payment/:id", GroupController.receivePayment);

export default router;
