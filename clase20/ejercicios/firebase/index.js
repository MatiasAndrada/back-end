var admin = require("firebase-admin");

var serviceAccount = require("./db/pichulitoo-5e382-firebase-adminsdk-jjpyn-6ef9e10fab.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("database connected");

async function CRUD() {
  let db = admin.firestore();
  const query = db.collection("users");
  try {
    //INSERT DATA
    /*
        const doc = query.doc("1");
        await doc.create({nombre: "Dario"});
        const doc2 = query.doc("2");
        await doc2.create({nombre: "Emiliano"});
        const doc3 = query.doc("3");
        await doc3.create({nombre: "Joaquin"});
        console.log("data inserted")
        */
    //READ ALL
    /*
       const querySnap = await query.get()
       const docs = querySnap.docs
       const data = docs.map((item) => {
        return {
          nombre: item.data().nombre
        }

       })
       console.log(data)
       */
    //DELETE DATA
    await db
      .collection("users")
      .doc()
      .delete()
      .then(function () {
        console.log("data deleted");
      });
  } catch (err) {
    console.log(err);
  }
}

CRUD();
