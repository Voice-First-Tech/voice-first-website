$( document ).ready(function() {
  let db = firebase.firestore();
    $("#submit").click(function() {
      let name = $("#name").val();
      let email = $("#email").val();
      let phone = $("#phone").val();
      let whatDoYouDo = $("#whatDoYouDo").val();
      let now = new Date($.now());
      db.collection("voice-consultation-submissions").doc(now.getYear() + ":" + now.getMonth() + ":" + now.getDay() + ":" + now.getHours() + ":" + now.getMinutes()).set({
          name: name,
          email: email,
          phone: phone,
          whatDoYouDo: whatDoYouDo
      })
      .then(function() {
          alert("Submitted! Someone from the Voice First Tech team will get in touch within 24 hours")
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    })
});
