const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_HOST;
const client = new MongoClient(uri);
let todoModel;

client
  .connect()
  .then(() => {
    todoModel = client.db("notes").collection("todos");
    console.log("Successful connection to MongoDB!!!");
  })
  .catch((error) => console.error("Connection to MongoDB failed!", error));

async function getAll({ sortObj, filterObj }) {
  try {
    const todos = await todoModel.find(filterObj).sort(sortObj).toArray();
    return todos;
  } catch (error) {
    console.error("Database query failed!", error);
    throw new Error("Failed to fetch To-do's.");
  }
}

async function createOne(todo) {
  try {
    const insertResult = await todoModel.insertOne(todo);
    const newTodo = await todoModel.findOne({ _id: insertResult.insertedId });
    return newTodo;
  } catch (error) {
    console.error("Error inserting To-do into database!", error);
    throw new Error("Failed to create To-do.");
  }
}

async function updateOne({ id, userId }, newTodo) {
  try {
    const updateResult = await todoModel.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        userId,
      },
      {
        $set: {
          title: newTodo.title,
          description: newTodo.description,
          dueDate: newTodo.dueDate,
          list: newTodo.list,
          isCompleted: newTodo.isCompleted,
          isHighPriority: newTodo.isHighPriority,
        },
      },
      { returnNewDocument: true }
    );

    return updateResult;
  } catch (error) {
    console.error("Error updating To-do in the database!", error);
    throw new Error("Failed to update To-do.");
  }
}

async function deleteOne({ id, userId }) {
  try {
    const deleteResult = await todoModel.findOneAndDelete({
      _id: new ObjectId(id),
      userId,
    });

    return deleteResult;
  } catch (error) {
    console.error("Error deleting To-do in the database!", error);
    throw new Error("Failed to delete To-do.");
  }
}

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
