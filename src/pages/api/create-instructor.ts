import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  try {
    // Create user
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Set custom claim 'instructor'
    await admin.auth().setCustomUserClaims(userRecord.uid, { instructor: true });

    res.status(200).json({ message: 'Instructor user created successfully', uid: userRecord.uid });
  } catch (error) {
    console.error('Error creating instructor user:', error);
    res.status(500).json({ error: 'Failed to create instructor user' });
  }
}
