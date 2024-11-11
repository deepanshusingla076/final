const questions = [
    {
        question: "What is Encryption?",
        options: [
            "A method to compress data",
            "A way to secure data by converting it into a code", // Correct
            "A method to store data",
            "A way to delete data"
        ],
        correct: 1
    },
    {
        question: "What does 'public key' encryption mean?",
        options: [
            "The key is kept private and not shared",
            "The key is used for decrypting data only",
            "The key is used for encrypting data only",
            "The key is shared publicly and can be used by anyone" // Correct
        ],
        correct: 3
    },
    {
        question: "What is a Caesar Cipher?",
        options: [
            "A method of reversing text",
            "A method of replacing text with symbols",
            "A type of substitution cipher that shifts letters by a fixed amount", // Correct
            "A method of transposing letters"
        ],
        correct: 2
    },
    {
        question: "What is hashing?",
        options: [
            "The process of decoding data",
            "The process of compressing data",
            "The process of encrypting data",
            "The process of converting data into a fixed-size string of characters" // Correct
        ],
        correct: 3
    },
    {
        question: "What is a digital signature?",
        options: [
            "A way to store data securely",
            "A method to encrypt messages",
            "A method to compress data",
            "A way to verify the authenticity and integrity of a message" // Correct
        ],
        correct: 3
    },
    {
        question: "What is a symmetric key algorithm?",
        options: [
            "An algorithm where different keys are used for encryption and decryption",
            "An algorithm that uses a public key for encryption",
            "An algorithm that uses a private key for encryption",
            "An algorithm where the same key is used for both encryption and decryption" // Correct
        ],
        correct: 3
    },
    {
        question: "What is a 'nonce' in cryptography?",
        options: [
            "A key used multiple times",
            "A type of encryption algorithm",
            "A method to hash data",
            "A number used only once to ensure freshness in encryption" // Correct
        ],
        correct: 3
    },
    {
        question: "What is the purpose of a Certificate Authority (CA)?",
        options: [
            "To encrypt data",
            "To compress data",
            "To decrypt data",
            "To issue and manage digital certificates" // Correct
        ],
        correct: 3
    },
    {
        question: "What is the difference between SSL and TLS?",
        options: [
            "SSL is the successor to TLS and is more secure",
            "Both are completely different encryption methods",
            "There is no difference between SSL and TLS",
            "TLS is the successor to SSL and is more secure" // Correct
        ],
        correct: 3
    },
    {
        question: "What is a brute force attack?",
        options: [
            "An attack that uses precomputed hashes",
            "An attack that exploits weaknesses in the encryption algorithm",
            "An attack that intercepts data in transit",
            "An attack that tries all possible keys until the correct one is found" // Correct
        ],
        correct: 3
    },
    {
        question: "What is the role of a 'salt' in hashing?",
        options: [
            "To encrypt the hash",
            "To compress the hash",
            "To decode the hash",
            "To add additional data to the hash to make it unique" // Correct
        ],
        correct: 3
    },
    {
        question: "What is the primary purpose of a firewall?",
        options: [
            "To monitor and control incoming and outgoing network traffic", // Correct
            "To encrypt data",
            "To compress data",
            "To store data"
        ],
        correct: 0
    },
    {
        question: "What does 'RSA' stand for in cryptography?",
        options: [
            "Rivest-Shamir-Adleman", // Correct
            "Rivest-Smith-Adams",
            "Rosen-Smith-Adams",
            "Rosen-Shamir-Adams"
        ],
        correct: 1
    },
    {
        question: "Which algorithm is commonly used in hashing passwords?",
        options: [
            "SHA-256",
            "MD5",
            "bcrypt", // Correct
            "AES"
        ],
        correct: 2
    },
    {
        question: "What is a man-in-the-middle attack?",
        options: [
            "An attack where the attacker intercepts and alters communication between two parties", // Correct
            "An attack that targets a single device",
            "An attack that exploits a software vulnerability",
            "An attack that floods a network with traffic"
        ],
        correct: 0
    },
    {
        question: "What does 'TLS' stand for?",
        options: [
            "Transport Layer Security", // Correct
            "Transport Layer Service",
            "Transport Layer System",
            "Transitional Layer Security"
        ],
        correct: 0
    },
    {
        question: "What is 'salting' in the context of hashing passwords?",
        options: [
            "Adding random data to the input of the hash function", // Correct
            "Encrypting the password before hashing",
            "Compressing the hashed password",
            "Appending the hash to the password"
        ],
        correct: 0
    },
    {
        question: "What is a one-time pad?",
        options: [
            "A cryptographic technique where a key is used only once and then discarded", // Correct
            "A method for securely storing data",
            "A type of digital certificate",
            "A software tool for encrypting data"
        ],
        correct: 2
    },
    {
        question: "What is a nonce in cryptographic terms?",
        options: [
            "A value used only once to prevent replay attacks", // Correct
            "A type of public key",
            "A random number used for encryption",
            "A method of hashing data"
        ],
        correct: 1
    },
    {
        question: "What does 'ECB' stand for in the context of encryption modes?",
        options: [
            "Electronic Codebook", // Correct
            "Electronic Cipher Block",
            "Enhanced Codebook",
            "Enhanced Cipher Block"
        ],
        correct: 2
    },
    {
        question: "What is the main difference between symmetric and asymmetric encryption?",
        options: [
            "Symmetric encryption uses the same key for both encryption and decryption, while asymmetric uses a pair of keys", // Correct
            "Symmetric encryption is slower than asymmetric encryption",
            "Symmetric encryption is more secure than asymmetric encryption",
            "Symmetric encryption requires multiple keys"
        ],
        correct: 2
    }
    
];
