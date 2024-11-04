export { default as TaskList } from './TaskList';
 
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteTask = functions.https.onCall(async (data, context) => {
  const { taskId } = data;
  try {
    await admin.firestore().collection("tasks").doc(taskId).delete();
    return { message: "Tarea eliminada con éxito" };
  } catch (error) {
    throw new functions.https.HttpsError(
      "internal",
      "Error al eliminar la tarea",
      error
    );
  }
});
