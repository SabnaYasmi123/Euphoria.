// Initialize Firebase (you can copy this code from your flight.js file)
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

    // Function to save hotel reservation details
    const saveHotelDetails = (destination, checkin, checkout, guests) => {
        // Basic validation to prevent empty fields (optional)
        if (!destination || !checkin || !checkout || !guests) {
            alert("Please fill in all required fields.");
            return;
        }

        // Save hotel reservation details to Firestore
        db.collection("hotels").add({
            destination: destination,
            checkin: checkin,
            checkout: checkout,
            guests: guests,
            userId: userId
        })
        .then((docRef) => {
            console.log("Hotel reservation data successfully stored in Firestore with ID: ", docRef.id);
            // Optional: Clear form fields and display confirmation message
            document.getElementById("hotelForm").reset();
            alert("Hotel reservation details submitted successfully!");
        })
        .catch((error) => {
            console.error("Error storing hotel reservation data:", error);
        });
    };

    // Function to handle form submission
    const submitHotelForm = (event) => {
        event.preventDefault();

        // Get form values
        const destination = document.getElementById("destination").value;
        const checkin = document.getElementById("checkin").value;
        const checkout = document.getElementById("checkout").value;
        const guests = document.getElementById("guests").value;

        // Save hotel reservation details
        saveHotelDetails(destination, checkin, checkout, guests);
    };

    // Add event listener for form submission
    document.getElementById("addhotelBtn").addEventListener("click", submitHotelForm);