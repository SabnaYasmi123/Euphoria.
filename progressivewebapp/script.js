
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
  
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics();

  // Get a reference to the database service
const db = firebase.database();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in, retrieve user ID
    userId = user.uid;
    console.log('userId ', userId);
    document.getElementById('loginbtn').classList.add('hidden')
    document.getElementById('logoutbtn').classList.remove('hidden')
    requestNotificationPermission();
    sendWelcomeNotificationToServer(user.uid); 
    // document.getElementById('loginLink').innerHTML = "<a id='logout'>Logout</a>"
    // saveFlightDetails(from, to, departureDate, returnDate, travellers, userId);
  } else {
    // User is not signed in, redirect to login.html
    window.location.href = "register.html";
  }
});


if ('Notification' in window) {
  // Request notification permission from the user
  requestNotificationPermission();
} else {
  console.log('Notifications are not supported in this browser.');
  // Show a message to the user indicating that notifications are not supported
  showNotificationsNotSupportedMessage();
}

// Function to request notification permission
function requestNotificationPermission() {
  if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
              console.log('Notification permission granted.');
              // Handle notification permission granted
              getToken();
          } else if (permission === 'denied') {
              console.log('Notification permission denied.');
              // Handle notification permission denied
              showNotificationPermissionDeniedMessage();
          } else {
              console.log('Notification permission blocked.');
              // Handle notification permission blocked
              showNotificationPermissionBlockedMessage();
          }
      });
  }
}

// Function to get the current token after permission is granted
function getToken() {
  // Get the messaging object
  const messaging = firebase.messaging();

  // Retrieve the registration token
  messaging.getToken({ vapidKey: '<BIumrfu33udH3HDr8tiOAJYY5TslPaHHIKfTzpq9i-QqCD4kISGKwdI90PS-CWmmmiKOWNBQ8PbXqqBTInBKFIA>' }).then((currentToken) => {
      if (currentToken) {
          // Token obtained successfully
          console.log('Current token:', currentToken);
          // Send the token to your server
          sendTokenToServer(currentToken);
      } else {
          // Token retrieval failed
          console.log('No registration token available.');
      }
  }).catch((err) => {
      // An error occurred while retrieving token
      console.error('Error retrieving token:', err);
  });
}


  // Function to send the token to your server (replace with your implementation)
function sendTokenToServer(token) {
  // Implement your server-side logic to store the token and send notifications
  // This is just a placeholder example, you'll need to implement your own logic
  fetch('/your-server-endpoint', {
    method: 'POST',
    body: JSON.stringify({ token }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Token sent to server:', data);
  })
  .catch(error => {
    console.error('Error sending token to server:', error);
  });
}

// Function to show notification permission denied message (optional)
function showNotificationPermissionDeniedMessage() {
  alert('Notification permission was denied. You can enable notifications in your browser settings to receive updates.');
}

// Function to show notification permission blocked message
function showNotificationPermissionBlockedMessage() {
  alert('Notification permission is blocked for this website. Please allow notifications from this website in your browser settings to receive updates.');
}

// Service worker push event
self.addEventListener('push', function(event) {
  const payload = event.data ? event.data.text() : 'no payload';
  console.log('Received a push message with data:', payload);
  
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
      body: payload,
      icon: '/firebase-logo.png'
  };
  
  event.waitUntil(
      self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

function requestNotificationPermission() {
  if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
              console.log('Notification permission granted.');
          
          } else {
              console.log('Unable to get permission to notify.');
          }
      });
  }
}


function sendWelcomeNotificationToServer(userId) {
    var notification = new Notification("Welcome", {
      body: `Welcome to Euphoria ${userId}`
    });
}


// Add event listener for form submission
document.getElementById("logoutbtn").addEventListener("click", function(event) {
  event.preventDefault();
  // console.log('sss');
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("User logged out successfully");
    // Redirect to login page or any other page after logout
    window.location.href = "login.html";
  }).catch(function(error) {
    // An error happened.
    console.error("Error while logging out:", error);
  });
});

function registerUser(event) {
  event.preventDefault(); // Prevent default form submission

  // Get user inputs
  const name = document.getElementById('name').value.trim(); // Trim leading/trailing spaces
  const userId = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value.trim();

  // Basic validation (optional, consider using a validation library)
  if (!name || !userId || !password) {
    alert('Please fill in all fields.');
    return;
  }

  // Secure password storage (using bcrypt - client-side hashing)
  // You'll need to include a bcrypt library (e.g., bcryptjs)
  bcrypt.hash(password, 10, (err, hash) => { // Adjust salt rounds as needed
    if (err) {
      console.error('Error hashing password:', err);
      alert('An error occurred during registration. Please try again.');
      return;
    }

    // Write user data to Firebase with hashed password
    db.ref('users/' + userId).set({
      name: name,
      passwordHash: hash // Store the hashed password
    })
    .then(() => {
      console.log('User registered successfully!');
      document.getElementById('registrationSuccessPopup').style.display = 'block';
      // Optionally, clear the form fields
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      const errorMessage = error.message || 'An error occurred during registration.';
      alert(errorMessage);
    });
  });
}

// Attach event listener to the registration form
// document.getElementById('registerForm').addEventListener('submit', registerUser);

// Function to write data to the database
function writeUserData(userId, name, email) {
  db.ref('users/' + userId).set({
    username: name,
    email: email
  }).then(() => {
    console.log('Data successfully written to the database');
  }).catch((error) => {
    console.error('Error writing data to the database: ', error);
  });
}

// Function to read data from the database
function readUserData(userId) {
  db.ref('users/' + userId).once('value')
    .then((snapshot) => {
      const data = snapshot.val();
      console.log('Data:', data);
    }).catch((error) => {
      console.error('Error reading data from the database: ', error);
    });
}


// Function to toggle the visibility of the side panel

// Function to handle the action of opening the login page
function openLogin() {
    // Redirect the user to the login page
    window.open('login.html', '_blank');
}


function handleFlightCardClick() {
    console.log("Flight card clicked");
    // Redirect the user to the flights booking page
    window.location.href = "flights.html";
}

function openNewPage() {
  // Open a new page
  window.location.href = "about.html";
}

function switchTab(tabName) {
    // Hide all tab contents
    var tabContents = document.getElementsByClassName('tabContent');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // Show the selected tab content
    document.getElementById(tabName + 'Content').style.display = 'block';
}

