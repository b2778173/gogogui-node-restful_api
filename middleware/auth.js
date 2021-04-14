const admin = require('firebase-admin');

// idToken comes from the client app
const auth = (req, res, next) => {
    if (!admin.apps.length) {
        admin.initializeApp();
    } else {
        admin.app(); // if already initialized, use that one
    }

    const idToken = req.header('idToken');
    if (!idToken) {
        res.status(400).send({ message: 'header idToken is required' });
        return;
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const { uid } = decodedToken;
            console.log('uid', uid);
            req.currentUser = decodedToken;
            // ...
            next();
        })
        .catch((error) => {
            // Handle error
            // console.log(error);
            res.status(400).send({ message: error });
        });
};

module.exports = auth;
