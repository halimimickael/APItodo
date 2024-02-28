const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema({
  task:String,
});


const taskModel = mongoose.model("tasks",taskSchema);
exports.taskModel = taskModel;


exports.validtasks = (_bodyData) => {
  let joiSchema = Joi.object({
    task:Joi.string().min(2).max(500).required()
  })

  return joiSchema.validate(_bodyData);
}