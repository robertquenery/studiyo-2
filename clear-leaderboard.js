const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

async function clearLeaderboard() {
  initializeApp({
    credential: applicationDefault(),
  });

  const db = getFirestore();
  const leaderboardRef = db.collection('leaderboard');

  const snapshot = await leaderboardRef.get();
  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log('Leaderboard cleared successfully.');
}

clearLeaderboard().catch(console.error);
