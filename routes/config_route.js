const tasksR = require("./tasks");
const usersR = require("./users");


exports.routesInit = (app) => {
  app.use("/tasks",tasksR)
  app.use("/users",usersR)
}