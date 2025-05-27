const { app } = require("./app");
const { prismadb } = require("./utils/prisma-client");

const { PORT } = process.env;

async function startServer() {
  try {
    await prismadb.$connect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`);
    });
  } catch (error) {
    console.log("Faild connect to the database", error);
    process.exit(1);
  }
}

startServer();
