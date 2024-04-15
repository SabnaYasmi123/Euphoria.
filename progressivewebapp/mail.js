
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

  const database = firebase.database(); // Realtime Database
  const db = firebase.firestore(); // Firestore
  const contactFormDB = database.ref("RegisterForm");
  const messaging = firebase.messaging();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sworker.js').then(res => {
        console.log("Service Worker registered successfully");
        messaging.useServiceWorker(res);
    }).catch(e => {
        console.error("Service Worker registration failed:", e);
    });
}

function submitForm(event) {
    event.preventDefault();

    const name = getElementVal("name");
    const email = getElementVal("emailid");
    const password = getElementVal("password");

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            saveUserData(userId, name, email); // Save to Firestore
            saveMessage(name, email, password); // Save to Realtime Database
            document.getElementById("RegisterForm").reset();
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error signing up:", error);
            alert("Error signing up:", error.message); // Access error message via error.message
        });
}


// Function to save user data to Firestore
async function saveUserData(userId, name, email) {
    try {
        await db.collection("user").doc(userId).set({
            name: name,
            email: email
        });
        console.log("User data successfully stored in Firestore!");
    } catch (error) {
        console.error("Error storing user data:", error);
    }
}
  
  // Function to save messages to the database
  function saveMessage(name, email, password) {
      const newContactForm = contactFormDB.push();
  
      newContactForm.set({
          name: name,
          email: email,
          password: password
      });
  }
  
  // Function to get element value by ID
  function getElementVal(id) {
      return document.getElementById(id).value;
  }
  
  // Add event listener for form submission
  document.getElementById("RegisterForm").addEventListener("submit", submitForm);



