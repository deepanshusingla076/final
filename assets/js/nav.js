const menu = document.getElementById('menu');
const actionBar = document.querySelector('.actionbar');
const menuText = document.querySelectorAll('.menuText');
const menuBtn = document.getElementById('menuBtn');

// css
function toggleMenu() {
    menu.classList.toggle('open');
    menuText.forEach(function(text, index) {
        setTimeout(() => {
            text.classList.toggle('open2');
        }, index * 50);
    });
}


function checkScreenWidth() {
    if (window.innerWidth <= 1180) {
        openMenu();
    } else {
        closeMenu();
    }
}


function openMenu() {
    menu.classList.add('open');
    menuText.forEach(function(text, index) {
        setTimeout(() => {
            text.classList.add('open2');
        }, index * 50);
    });
}

function closeMenu() {
    menu.classList.remove('open');
    menuText.forEach(function(text, index) {
        setTimeout(() => {
            text.classList.remove('open2');
        }, index * 50);
    });
}

// menu open/close
menuBtn.addEventListener('click', () => {
    if (window.innerWidth > 1180) {
        toggleMenu();
    }
});

// call
checkScreenWidth();

// idk
window.addEventListener('resize', checkScreenWidth);


// main thingy
const dayNight = document.querySelector('#themeChangeBtn');
dayNight.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    //const newTheme = currentTheme === 'dark' ? 'simple' : currentTheme === 'simple' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);
    updateIcon();
    updateFavicon();
});

function themeMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon();
    updateFavicon();
}
function updateIcon() {
    const icon = dayNight.querySelector('i');
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else if (theme === 'simple') {
        icon.className = 'fas fa-leaf';
    } else {
        icon.className = 'fas fa-sun';
    }
}

function updateFavicon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const favicon = document.querySelector('link[rel="icon"]');
    
    // Variables for the favicon and stylesheet paths
    let faviconPath;
    let stylesheetPath;

    // Set the favicon and stylesheet based on the theme
    if (theme === 'dark') {
        faviconPath = 'images/dark-icon.png';
        stylesheetPath = 'assets/css/toggle/main.css';  
    } else if (theme === 'simple') {
        faviconPath = 'images/simple-icon.ico';
        stylesheetPath = 'assets/css/toggle/simple.css'; 
    } else {
        faviconPath = 'images/light-icon.png';
        stylesheetPath = 'assets/css/toggle/main.css';
    }

    // Update the favicon
    favicon.setAttribute('href', faviconPath);

    // Check if either stylesheet exists before making changes
    const mainStylesheet = document.querySelector('link[href*="assets/css/toggle/main.css"]');
    const simpleStylesheet = document.querySelector('link[href*="assets/css/toggle/simple.css"]');

    // If the theme is 'simple' and the main stylesheet is present, remove it
    if (theme === 'simple' && mainStylesheet) {
        mainStylesheet.parentNode.removeChild(mainStylesheet);
    } 
    // If the theme is not 'simple' and the simple stylesheet is present, remove it
    else if (theme !== 'simple' && simpleStylesheet) {
        simpleStylesheet.parentNode.removeChild(simpleStylesheet);
    }

    // Check if the correct stylesheet is already in the document
    if (!document.querySelector(`link[href="${stylesheetPath}"]`)) {
        // Create and add the appropriate stylesheet if it's not already included
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylesheetPath;
        document.head.appendChild(link);
    }
}
// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmhWPdziiccwoq_JkCc6gkx2nXORVKj-s",
    authDomain: "fein-49153.firebaseapp.com",
    projectId: "fein-49153",
    storageBucket: "fein-49153.appspot.com",
    messagingSenderId: "669153623133",
    appId: "1:669153623133:web:4200026c11398f721da1b4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check user authentication state on page load
auth.onAuthStateChanged((user) => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        loadUserData(user);
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        displayGuestPage();
    }
});


// Set persistence to LOCAL
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        // Optional: Uncomment this line if you want to sign in immediately
        // return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    })
    .catch((error) => {
        console.error('Error setting persistence:', error);
    });


function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        const user = result.user;
        loadUserData(user);
    }).catch((error) => {
        console.error('Error during login:', error);
    });
}

function logout() {
    firebase.auth().signOut().then(() => {
        displayGuestPage();
    }).catch((error) => {
        console.error('Error during logout:', error);
    });
}


function displayGuestPage() {
    const contentElement = document.getElementById('content');
    if (contentElement) {
        contentElement.innerHTML = `<center><h1>Welcome, Guest!</h1></center>
            <button id="login-btn" onclick="loginWithGoogle()">Login with Google</button>`;
    } else {
        console.error('Content element not found!');
    }
}


async function loadUserData(user) {
    const userRef = db.collection('users').doc(user.uid);
    const docSnap = await userRef.get();

    if (docSnap.exists) {
        const userData = docSnap.data();
        const userObj = {
            username: userData.username || user.displayName,
            profilePicture: userData.profilePicture || user.photoURL,
            level: userData.level || 1,
            experience: userData.experience || 0,
            title: userData.title || 'Beginner'
        };


        localStorage.setItem('userProfile', JSON.stringify(userObj));

        displayUserPage(userObj); 
        checkSubscriptionStatus(user);
        updateUserNavbar(userObj.username, userObj.profilePicture); 
    } else {
        console.log('No user data found in Firestore');
        checkUserInFirestore(user);
    }
}




// Display user page after login
function displayUserPage(user) {
    const contentElement = document.getElementById('content');
    if (contentElement) {
        contentElement.innerHTML = `
            <div class="user-info">
          <img src="${user.profilePicture || 'images/default-profile.jpg'}" alt="User Image">
          <div>
            <h1>Welcome, <span id="username">${user.username}</span></h1>
            <p>Level: <span id="level">${user.level || '1'}</span></p>
            <p>Experience: <span id="experience">${user.experience || '0'}</span> XP</p>
            <p>Title: <span id="title">${user.title || 'Beginner'}</span></p>           
            <div class="experience-bar">
              <div id="experience-bar" class="progress-bar"></div>
            </div>
          </div>
        </div>
        <div class="skills">
            <h2>Skills</h2>
            <div class="skill">
                <h3>Symmetric Encryption</h3>
                <p>Proficiency: <span id="sym-encrypt-skill">Advanced</span></p>
                <div class="progress-bar">
                    <div id="sym-encrypt-skill-bar" style="width: 85%;"></div>
                </div>
            </div>
            <div class="skill">
                <h3>Asymmetric Encryption</h3>
                <p>Proficiency: <span id="asym-encrypt-skill">Intermediate</span></p>
                <div class="progress-bar">
                    <div id="asym-encrypt-skill-bar" style="width: 70%;"></div>
                </div>
            </div>
            <div class="skill">
                <h3>Hash Functions</h3>
                <p>Proficiency: <span id="hash-skill">Expert</span></p>
                <div class="progress-bar">
                    <div id="hash-skill-bar" style="width: 90%;"></div>
                </div>
            </div>
            <div class="skill">
                <h3>Cryptanalysis</h3>
                <p>Proficiency: <span id="cryptanalysis-skill">Beginner</span></p>
                <div class="progress-bar">
                    <div id="cryptanalysis-skill-bar" style="width: 40%;"></div>
                </div>
            </div>
        </div>
    
        <div class="achievements">
            <h2>Achievements</h2>
            <div class="achievement">
                <img src="images/dash/achievement1.jpeg" alt="Achievement 1">
                <div>
                    <h3>Cryptography Novice</h3>
                    <p>Completed introductory courses on encryption techniques.</p>
                </div>
            </div>
            <div class="achievement">
                <img src="images/dash/achievement2.jpeg" alt="Achievement 2">
                <div>
                    <h3>Encryption Master</h3>
                    <p>Developed a custom encryption algorithm and presented it at a conference.</p>
                </div>
            </div>
            <div class="achievement">
                <img src="images/dash/achievement3.jpeg" alt="Achievement 3">
                <div>
                    <h3>Hash Function Guru</h3>
                    <p>Implemented various hash functions and contributed to open-source projects.</p>
                </div>
            </div>
            <div class="achievement">
                <img src="images/dash/achievement4.jpeg" alt="Achievement 4">
                <div>
                    <h3>Cryptanalysis Enthusiast</h3>
                    <p>Successfully cracked multiple ciphers and participated in cryptanalysis challenges.</p>
                </div>
            </div>
        </div>
        <button id="logout-btn" onclick="logout()">Logout</button>
        `;

        if (document.getElementById('login-btn')) {
            document.getElementById('login-btn').style.display = 'none';
        }
        if (document.getElementById('logout-btn')) {
            document.getElementById('logout-btn').style.display = 'block';
        }
        
    } else {
        console.error('Content element not found!');
    }
}


function updateUserNavbar(username, profilePicture) {
    const userImage = document.querySelector('.menuUser img'); 
    const userNameElement = document.querySelector('.menuUser .Username'); 

    if (userImage && userNameElement) {
        userImage.src = profilePicture || 'images/user.jpg';
        userNameElement.textContent = username || 'A. Maurya'; 
        
    } else {
        console.error('Navbar user elements not found!');
    }
}

async function checkUserInFirestore(user) {
    const userRef = db.collection('users').doc(user.uid);
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
        await userRef.set({
            username: user.displayName,
            profilePicture: user.photoURL,
            hasSubscription: false
        });
        console.log('User document created successfully.');

        window.location.reload();
    }
}

async function checkSubscriptionStatus(user) {
    console.log('runn');
    const userRef = db.collection('users').doc(user.uid);
    const docSnap = await userRef.get();

    if (docSnap.exists) {
        const userData = docSnap.data();
        console.log('runnaaar');
        if (userData.hasSubscription === true) {
            const burraDiv = document.getElementById('burra');
            if (burraDiv) {
                burraDiv.innerHTML = '<center><h1>You are already subscribed</h1></center>';
            }
        }
    } else {
        console.log('User document not found');
    }
}   

themeMode();