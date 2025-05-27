const {
  addNewProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectControllers");
const { checkAuth } = require("../middlewars");

const router = require("express").Router();

router.use(checkAuth);

//Get projects
router.get("/", getProjects);

//Add new project
router.post("/add", addNewProject);

//Update project
router.put("/update/:projectId", updateProject);

//Delete project
router.delete("/delete/:projectId", deleteProject);

module.exports = router;
