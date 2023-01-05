const express = require("express");
const { normalize, schema } = require("normalizr");
const originalData = require("./originalData.json");
const util = require("util");
const ContainerFirebase = require("./ContainerFirebase");
const app = express();
const PORT = 8080;
app.use(express.json());
const messagesAPI = new ContainerFirebase("messages");

async function postData() {
  await messagesAPI.saveAll(originalData);
}
postData();

app.get("/api/messages", async (req, res) => {
  const snapshot = await messagesAPI.getAll();

  res.send(snapshot);
});

const authorSchema = new schema.Entity("authors", {}, { idAttribute: "id" }); //---->Para Normalizr
const messageSchema = new schema.Entity(
  "messages",
  { author: authorSchema },
  { idAttribute: "_id" }
); //---->Para Normalizr

  const data_normalizada = normalize(originalData, [messageSchema]);
  console.log(util.inspect(data_normalizada, false, 12, true));


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
