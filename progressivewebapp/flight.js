
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

// Get a reference to the Firebase Realtime Database
const database = firebase.database();
// Get a reference to the Firestore database
const db = firebase.firestore();

// Reference to your Firebase database (modify path if needed)
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

// Function to save flight details (with basic validation)
const saveFlightDetails = (from, to, departureDate, returnDate, travellers) => {
  // Basic validation to prevent empty fields (optional)
  if (!from || !to || !departureDate || !returnDate || !travellers) {
    alert("Please fill in all required fields.");
    return;
  }

db.collection("flights").doc().set({
    from : from,
    to : to,
    departureDate : departureDate ,
    returnDate : returnDate ,
    travellers : travellers,
    userId: userId
})
.then(() => {
    console.log("User data successfully stored in Firestore!");
})
.catch((error) => {
    console.error("Error storing user data:", error);
});

  // Optional: Clear form fields and display confirmation message
  document.getElementById("FlightForm").reset();
  alert("Flight details submitted successfully!");
};

// Function to handle form submission
const submitFlightForm = (event) => {
  event.preventDefault();

  // Get form values
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const departureDate = document.getElementById("departure-date").value;
  const returnDate = document.getElementById("return-date").value;
  const travellers = document.getElementById("travellers").value;

  // Save flight details
  saveFlightDetails(from, to, departureDate, returnDate, travellers);
};

 

// Add event listener for form submission
document.getElementById("FlightForm").addEventListener("submit", submitFlightForm);