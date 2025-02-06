const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_HOST;
const client = new MongoClient(uri);
let userModel;

client
  .connect()
  .then(() => {
    userModel = client.db("notes").collection("users");
    console.log("Successful connection to MongoDB!");
  })
  .catch((error) => console.error("Connection to MongoDB failed!", error));

async function findUserByID(id) {
  try {
    const user = await userModel.findOne({ _id: new ObjectId(id) });

    if (!user) return null;
    return user;
  } catch (error) {
    console.error("Error fetching user from database!", error);
    throw new Error("Database query failed when fetching user.");
  }
}

async function findUserByEmail(email) {
  try {
    const user = await userModel.findOne({ email });

    if (!user) return null;
    return user;
  } catch (error) {
    console.error("Error fetching user from database!", error);
    throw new Error("Database query failed when fetching user.");
  }
}

async function login({ email, password }) {
  try {
    const user = await userModel.findOne({ email });

    if (!user) return null;
    if (user.password !== password) return null;

    return user;
  } catch (error) {
    console.error("Error fetching user from database!", error);
    throw new Error("Failed to fetch User.");
  }
}

async function register({ username, email, password }) {
  try {
    const insertResult = await userModel.insertOne({
      username,
      email,
      password,
    });
    if (!insertResult.insertedId) {
      throw new Error("Failed to create User.");
    }

    const user = await userModel.findOne({ email });
    if (!user) return null;
    if (user.password !== password) return null;

    return user;
  } catch (error) {
    console.error("Error inserting user into database!", error);
    throw new Error("Failed to create User.");
  }
}

module.exports = {
  findUserByID,
  findUserByEmail,
  login,
  register,
};
