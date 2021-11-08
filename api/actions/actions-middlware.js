// add middlewares here related to actions
const Actions = require("./actions-model");

async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const validAction = await Actions.get(id);
    if (!validAction) {
      next({
        status: 404,
        message: "Action not found",
      });
    } else {
      req.actionId = validAction;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function validateBody(req, res, next) {
  try {
    const { description, notes } = req.body;
    if (
      !description ||
      typeof description !== "string" ||
      description.length > 128 ||
      !description.trim()
    ) {
      next({
        status: 400,
        message: "Action description is required, limit 128 characters",
      });
    } else if (!notes || typeof notes !== "string" || !notes.trim()) {
      next({
        status: 400,
        message: "Action notes is required.",
      });
    } else {
      req.action = req.body;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateId,
  validateBody,
};
