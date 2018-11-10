initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      let fullName;
      if ( displayName ) {
        fullName = displayName.split(" ");
      }
      user.getIdToken().then(function(accessToken) {
        $('#sign-in-status').text('Signed in');
        $('#sign-in').text('Sign out');
        $('#account-details').text(JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  '));
      });
      if ( displayName ) {
        $("#display-name").text(fullName[0] + ", ");
      }
      addPageVisit(user);
    } else {
      // User is signed out.
      $('#sign-in-status').text('Signed out');
      $('#sign-in').text('Sign in');
      $('#account-details').text('null');
    }
  }, function(error) {
    console.log(error);
  });
};

addPageVisit = function(user) {
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);
  // Initialize Cloud Firestore through Firebase
  let db = firebase.firestore();
  let accessToken = user.getIdToken();
  let currentdate = new Date();
  let datetime =  (currentdate.getMonth()+1) + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
  // Add a new document in collection "cities"
  db.collection("website-stats").doc("login").collection("users").doc(user.uid).set({
    lastLogin: datetime,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    uid: user.uid,
    providerData: user.providerData
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.log("Error writing document: ", error);
  });
}

window.addEventListener('load', function() {
  initApp()
});
