import { openDB } from 'idb';
import CONFIG from '../global/config';

const {
  DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME_1,
  OBJECT_STORE_NAME_2, OBJECT_STORE_NAME_3, OBJECT_STORE_NAME_4,
} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME_1, { keyPath: 'id' });
    database.createObjectStore(OBJECT_STORE_NAME_2, { keyPath: 'id' });
    database.createObjectStore(OBJECT_STORE_NAME_3, { keyPath: 'id' });
    database.createObjectStore(OBJECT_STORE_NAME_4, { keyPath: 'id' });
  },
});

const NoteiDB = {

  async putNote(note, level) {
    let object;
    if (level === 1) {
      object = OBJECT_STORE_NAME_1;
    } else if (level === 2) {
      object = OBJECT_STORE_NAME_2;
    } else if (level === 3) {
      object = OBJECT_STORE_NAME_3;
    } else {
      object = OBJECT_STORE_NAME_4;
    }
    return (await dbPromise).put(object, note);
  },
  async getAllNote(level) {
    let object;
    if (level === 1) {
      object = OBJECT_STORE_NAME_1;
    } else if (level === 2) {
      object = OBJECT_STORE_NAME_2;
    } else if (level === 3) {
      object = OBJECT_STORE_NAME_3;
    } else {
      object = OBJECT_STORE_NAME_4;
    }
    return (await dbPromise).getAll(object);
  },
  async getNoteById(id, level) {
    let object;
    if (level === 1) {
      object = OBJECT_STORE_NAME_1;
    } else if (level === 2) {
      object = OBJECT_STORE_NAME_2;
    } else if (level === 3) {
      object = OBJECT_STORE_NAME_3;
    } else {
      object = OBJECT_STORE_NAME_4;
    }
    return (await dbPromise).get(object, id);
  },
  async deleteNote(id, level) {
    let object;
    if (level === 1) {
      object = OBJECT_STORE_NAME_1;
    } else if (level === 2) {
      object = OBJECT_STORE_NAME_2;
    } else if (level === 3) {
      object = OBJECT_STORE_NAME_3;
    } else {
      object = OBJECT_STORE_NAME_4;
    }
    return (await dbPromise).delete(object, id);
  },
};
export default NoteiDB;
