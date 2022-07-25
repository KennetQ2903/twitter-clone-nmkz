import { getFirestore } from 'firebase/firestore'

const admin = require('firebase-admin')

const serviceAccount = require('./nmkzdev-f2502-firebase-adminsdk-2bw4z-3cebbb07cc.json')
admin.apps.length === 0
  ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  : admin.app()

export const fireStore = admin.firestore()
