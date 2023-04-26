import { Router } from "express";
const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  res.render("chat", {});
});

export default viewsRouter;
