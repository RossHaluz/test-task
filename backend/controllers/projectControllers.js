const { default: axios } = require("axios");
const { httpError, ctrlWrapper } = require("../helpers");
const { prismadb } = require("../utils/prisma-client");

const addNewProject = async (req, res) => {
  const { repoPath } = req.body;
  const userId = req.userId;

  if (!repoPath.includes("/")) throw httpError(400, "Invalid path");

  const responce = await axios.get(`${process.env.GITHUB_URL}/${repoPath}`);

  const data = responce?.data;

  const newProject = await prismadb.project.create({
    data: {
      userId,
      owner: data.owner.login,
      name: data.name,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAt: new Date(data.created_at),
    },
  });

  if (!newProject) {
    throw httpError(400, "Something went wrong");
  }

  return res.status(201).json(newProject);
};

const getProjects = async (req, res) => {
  const userId = req.userId;

  const projects = await prismadb.project.findMany({
    where: {
      userId,
    },
  });

  return res.status(200).json(projects);
};

const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const userId = req.userId;

  const project = await prismadb.project.findFirst({
    where: {
      userId,
      id: projectId,
    },
  });

  if (!project) throw httpError(404, "Project not found");

  const repoPath = `${project?.owner}/${project?.name}`;

  const { data } = await axios.get(`${process.env.GITHUB_URL}/${repoPath}`);

  const updateProject = await prismadb.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: data?.name,
      owner: data.owner.login,
      url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAt: new Date(data.created_at),
    },
  });

  if (!updateProject) throw httpError(400, "Something went wrong");

  return res.status(200).json(updateProject);
};

const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  const deleteProject = await prismadb.project.delete({
    where: {
      id: projectId,
    },
  });

  if (!deleteProject) throw httpError(400, "Something went wrong");

  return res.status(200).json({
    message: "Project success delete",
  });
};

module.exports = {
  addNewProject: ctrlWrapper(addNewProject),
  getProjects: ctrlWrapper(getProjects),
  updateProject: ctrlWrapper(updateProject),
  deleteProject: ctrlWrapper(deleteProject),
};
