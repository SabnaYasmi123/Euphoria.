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

let userId = "";

// Check authentication status
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in, retrieve user ID
        userId = user.uid;
        console.log('userId:', userId);
        displayUpcomingHotelBookings(userId);
    } else {
        // User is not signed in, redirect to login.html
        window.location.href = "login.html";
    }
});

// Function to fetch and display upcoming hotel bookings
function displayUpcomingHotelBookings(userId) {
    console.log('Fetching upcoming hotel bookings for user ID:', userId);
    const hotelDetailsContainer = document.getElementById('hotelDetails');
    const today = new Date();

    // Query hotels collection based on userId and check-in date greater than today
    db.collection("hotels").where("userId", "==", userId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const hotelData = doc.data();
                // Convert check-in date string to Date object
                const checkinDate = new Date(hotelData.checkin);
                if (checkinDate > today) {
                    console.log('Upcoming hotel booking details:', hotelData);
                    const hotelElement = createHotelElement(hotelData); // Create HTML elements to display hotel details
                    hotelDetailsContainer.appendChild(hotelElement);
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching upcoming hotel bookings:", error);
        });
}

function createHotelElement(hotelData) {
    const hotelElement = document.createElement('div');
    hotelElement.innerHTML = `
        <p><strong>Hotel Name:</strong> ${hotelData.destination}</p>
        <p><strong>Location:</strong> ${hotelData.destination}</p>
        <p><strong>Check-in Date:</strong> ${hotelData.checkin}</p>
        <p><strong>Check-out Date:</strong> ${hotelData.checkout}</p>
        <p><strong>Guests:</strong> ${hotelData.guests}</p>
        <hr>
    `;
    return hotelElement;
}