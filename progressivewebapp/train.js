const firebaseConfig = {
    apiKey: "AIzaSyDwDIRX0Xzfnnq0wyjUX2EcsDBupoUA2n8",
    authDomain: "progressive-web-app-e6466.firebaseapp.com",
    databaseURL: "https://progressive-web-app-e6466-default-rtdb.firebaseio.com",
    projectId: "progressive-web-app-e6466",
    storageBucket: "progressive-web-app-e6466.appspot.com",
    messagingSenderId: "953962351852",
    appId: "1:953962351852:web:ea139c90661b6bcffb69c9",
    measurementId: "G-EY8MC668EC"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let userId = ""
// Check authentication status
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, retrieve user ID
    userId = user.uid;
    console.log('userId ', userId);
    // saveFlightDetails(from, to, departureDate, returnDate, travellers, userId);
  } else {
    // User is not signed in, redirect to login.html
    window.location.href = "login.html";
  }
});

// Function to save train booking details
const saveTrainDetails = (from, to, departureDate) => {
  // Save train booking details to Firestore
  db.collection("trains").add({
    from: from,
    to: to,
    departureDate: departureDate,
    userId: userId
  })
  .then((docRef) => {
    console.log("Train booking data successfully stored in Firestore with ID: ", docRef.id);
    // Optional: Clear form fields and display confirmation message
    document.getElementById("TrainForm").reset();
    alert("Train booking details submitted successfully!");
  })
  .catch((error) => {
    console.error("Error storing train booking data:", error);
  });
};

// Function to handle form submission
const submitTrainForm = (event) => {
  event.preventDefault();

  // Get form values
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const departureDate = document.getElementById("departure-date").value;

  // Save train booking details
  saveTrainDetails(from, to, departureDate);
};

// Add event listener for form submission
document.getElementById("TrainForm").addEventListener("submit", submitTrainForm);