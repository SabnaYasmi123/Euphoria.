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

  // Get references to authentication and database services
  const auth = firebase.auth();
  const database = firebase.database();
  const db = firebase.firestore();
  
  const loginForm = document.getElementById('loginForm');
  


  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('userId').value;
    const password = document.getElementById('password').value;

    // Sign in the user with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successful login
            console.log("User logged in:", userCredential.user.uid);

            getUserNameFromFirestore(userId);
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert(error.message)
        });
});

async function getUserNameFromFirestore(userId) {
    const db = firebase.firestore(); // Assuming you've configured Firestore
    const userDocRef = db.collection('users').doc(userId); // Use the provided user ID
    const userDocSnap = await getDoc(userDocRef);
  
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.name || 'No Name'; // Check for name in user data and provide a default
    } else {
      console.log('No data available for this user');
      return null;
    }
  }