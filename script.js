// Configuration Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",               // Remplace par ta clé API
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Remplace par ton ID de projet
    databaseURL: "https://<ton_projet_id>.firebaseio.com",  // Remplace par l'URL de ta base de données
    projectId: "YOUR_PROJECT_ID",         // Remplace par ton ID de projet
    storageBucket: "YOUR_PROJECT_ID.appspot.com",  // Remplace par ton bucket
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Remplace par ton ID d'expéditeur
    appId: "YOUR_APP_ID"                 // Remplace par ton ID d'application
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la base de données Firebase
const database = firebase.database();

// Publier un tweet
document.getElementById("tweetButton").onclick = function() {
    const tweetInput = document.getElementById("tweetInput");
    const tweetText = tweetInput.value.trim();

    if (tweetText === "") {
        alert("Écris quelque chose avant de publier !");
        return;
    }

    // Ajouter le tweet à Firebase
    const tweetListRef = database.ref('tweets');
    tweetListRef.push({
        text: tweetText,
        timestamp: Date.now()
    });

    // Vider l'input après publication
    tweetInput.value = "";
};

// Afficher les tweets en temps réel
database.ref('tweets').on('child_added', function(snapshot) {
    const tweetText = snapshot.val().text;

    const tweetList = document.getElementById("tweets");
    const newTweet = document.createElement("li");
    newTweet.textContent = tweetText;
    tweetList.prepend(newTweet);  // Ajouter le tweet en haut de la liste
});
