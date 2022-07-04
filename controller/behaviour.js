const Behaviour = require("../model/behaviour");
const { Todo, BehaviourTodoList } = require("../model/behaviourTodo");

exports.create = (req, res) => {
  const name = req.body;
  const behaviour = new Behaviour(req.body);
  behaviour.save((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({ data });
  });
};

exports.getAllBehaviour = (req, res) => {
  Behaviour.find().exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};

exports.addTodo = (req, res) => {
  const { behaviour, todoName, todoDetails } = req.body;
  const todo = new Todo({ todoName, todoDetails });
  todo.save((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: err,
      });
    }
    const { _id } = data;
    BehaviourTodoList.findByIdAndUpdate(
      behaviour,
      { $push: { Todo: _id } },
      { safe: true, upsert: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          return res.status(200).json({ message: "Successfully Added" });
        }
      }
    );
  });
};

exports.listTodo = (req, res) => {
  const { behaviour } = req.params;

  BehaviourTodoList.findById(behaviour)
    .populate("Todo", "todoName todoDetails")
    .exec((err, data) => {
      if (err) {
        return res.status(200).json({
          error: err,
        });
      } else {
        return res.status(200).json({ data });
      }
    });
};

exports.deleteTodo = (req, res) => {
  const { behaviour, todoId } = req.params;
  BehaviourTodoList.findByIdAndUpdate(
    behaviour,
    { $pull: { Todo: todoId } },
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        Todo.findByIdAndDelete({ _id: todoId }).exec((err, data) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          } else {
            return res.status(200).json({ message: "Delete Successfully" });
          }
        });
      }
    }
  );
};

exports.editTodo = (req, res) => {
  const { todoId } = req.params;
  Todo.findByIdAndUpdate({ _id: todoId },{$set : req.body}, {new : true}, (err, data)=>{
    if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({ message: "Edited Successfully" });
      }
  })
};
