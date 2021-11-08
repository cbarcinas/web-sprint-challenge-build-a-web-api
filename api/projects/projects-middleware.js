// add middlewares here related to projects
const Projects = require("./projects-model");

async function validateId(req, res, next) {
  try {
    const { id } = req.params;
    const validProject = await Projects.get(id);
    if (validProject) {
      req.projectId = validProject;
      next();
    } else {
      next({
        status: 404,
        message: "Project not found",
      });
    }
  } catch (error) {
    next(error);
  }
}

async function validateBody(req, res, next) {
  try {
    const { name, description, completed } = req.body;
    if (!name || typeof name !== "string" || !name.trim()) {
      next({
        status: 400,
        message: "Your project requires a name",
      });
    } else if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      next({
        status: 400,
        message: "Your project requires a description",
      });
    } else if (completed === undefined) {
      next({
        status: 400,
        message: "Problem with project status",
      });
    } else {
      req.projectBody = req.body;
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
