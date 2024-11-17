import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor() {
    const serviceAccount = require(
      path.resolve(__dirname, '..', '..', '..', 'images-firebase-json.json'),
    );

    // const serviceAccount = require('./images-of-hhrm-system-firebase-adminsdk-e6wjw-e23217cc34.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL:
        'https://images-of-hhrm-system-default-rtdb.asia-southeast1.firebasedatabase.app',
      storageBucket: 'gs://images-of-hhrm-system.appspot.com',
    });
    this.storage = admin.storage();
  }

  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }
}
