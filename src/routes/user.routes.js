import { Router } from 'express';
import userCtrl from '../controllers/userController.js';

const route = Router();
route.get("/listar",userCtrl.getUser);//revisar
route.put("/email",userCtrl.updateUser);//listo
route.delete("/email",userCtrl.deleteUser);//listo
route.get("/",userCtrl.getAllUsers);//listo

route.post("/registrer",userCtrl.registrer);//listo
route.post("/login",userCtrl.login)//listo

export default route;