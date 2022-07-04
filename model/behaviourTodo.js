const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const TodoSchema = new mongoose.Schema(
  {
    todoName: {
      type: String,
      required: true,
    },
    todoDetails: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo",TodoSchema);

const BehaviourTodoSchema = new mongoose.Schema(
  {
    behaviour: {
      type: ObjectId,
      ref: "Behaviour",
    },
    Todo: [
        {type : ObjectId,
        ref : 'Todo'}
    ],
  },
  {
    timestamps: true,
  }
);

const BehaviourTodoList = mongoose.model("BehaviourTodoList", BehaviourTodoSchema);

module.exports = {BehaviourTodoList,Todo}