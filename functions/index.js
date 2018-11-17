const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.newOrder = functions.firestore
    .document('orders/{orderId}')
    .onCreate((snap, context) => {
      console.log("NEW ORDER! :)");
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();
      console.log(newValue);

      // access a particular field as you would any JS property
      const name = newValue.name;
      console.log(name);

      // perform desired operations ...
    });
