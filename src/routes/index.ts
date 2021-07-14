import { Router } from "express";
import resgisterRouter from "./register.router";

const routes = Router();

routes.use('/projects', resgisterRouter);

export default routes;
