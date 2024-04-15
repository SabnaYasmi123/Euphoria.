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
        console.log('userId ', userId);
        displayTrainDetails(userId);
    } else {
        // User is not signed in, redirect to login.html
        window.location.href = "login.html";
    }
});

// Function to fetch and display train booking details
function displayTrainDetails(userId) {
    console.log('Fetching train details for user ID:', userId);
    const trainDetailsContainer = document.getElementById('trainDetails');

    // Query trains collection based on userId
    db.collection("trains").where("userId", "==", userId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const trainData = doc.data();
                console.log('Train details:', trainData); // Log train details
                // Create HTML elements to display train details
                const trainElement = document.createElement('div');
                trainElement.innerHTML = `
                    <p><strong>From:</strong> ${trainData.from}</p>
                    <p><strong>To:</strong> ${trainData.to}</p>
                    <p><strong>Departure Date:</strong> ${trainData.departureDate}</p>
                    <hr>
                `;
                trainDetailsContainer.appendChild(trainElement);
            });
        })
        .catch((error) => {
            console.error("Error fetching train details:", error);
        });
}
