const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

async function setInstructorClaim(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { instructor: true });
    console.log(`Instructor claim set for user: ${email}`);
  } catch (error) {
    console.error('Error setting instructor claim:', error);
  }
}

// Replace with the email of the user to authorize as instructor
const emailToAuthorize = 'charleschen@studiyo.ca';

setInstructorClaim(emailToAuthorize);
