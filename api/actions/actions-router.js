// Write your "actions" router here!
const actionsRouter = require("express").Router();
const Actions = require("./actions-model");
const { validateId, validateBody } = require("./actions-middlware");
actionsRouter.get("/", async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    next(error);
  }
});
actionsRouter.get("/:id", validateId, async (req, res, next) => {
  try {
    res.status(200).json(req.actionId);
  } catch (error) {
    next(error);
  }
});
actionsRouter.post("/", validateBody, async (req, res, next) => {
  try {
    await Actions.insert(req.action);
    res.status(201).json(req.action);
  } catch (error) {
    next(error);
  }
});
actionsRouter.put("/:id", validateId, validateBody, async (req, res, next) => {
  try {
    const updateAction = await Actions.update(req.params.id, req.action);
    res.status(200).json(updateAction);
  } catch (error) {
    next(error);
  }
});
actionsRouter.delete("/:id", validateId, async (req, res, next) => {
  try {
    await Actions.remove(req.actionId.id);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = actionsRouter;
