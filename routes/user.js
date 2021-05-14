const express = require('express');
const admin = require('firebase-admin');
// verify token middleware (idToken need be granted from frontend)
const auth = require('../middleware/auth');

const router = express.Router();

// admin.initializeApp();

router.get('/', auth, (req, res) => {
    const listAllUsers = (nextPageToken) => {
        // List batch of users, 1000 at a time.
        admin
            .auth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
                console.log(listUsersResult.users);
                res.status(200).send({ message: listUsersResult.users });
                if (listUsersResult.pageToken) {
                    // List next batch of users.
                    listAllUsers(listUsersResult.pageToken);
                }
            })
            .catch((error) => {
                res.status(403).send({ message: `Error listing users:${error}` });
            });
    };
    // Start listing users from the beginning, 1000 at a time.
    listAllUsers();
});
// create user
router.post('/', auth, (req, res) => {
    console.log(req.body);
    const {
        email,
        emailVerified,
        phoneNumber,
        password,
        displayName,
        photoURL,
        disabled
    } = req.body;
    admin
        .auth()
        .createUser({
            email,
            emailVerified,
            phoneNumber,
            password,
            displayName,
            photoURL,
            disabled
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            res.status(201).send({ result: `Successfully created new user:${userRecord.uid}` });
        })
        .catch((error) => {
            res.status(403).send({ message: `Error creating new user:${error}` });
        });
});

module.exports = router;
