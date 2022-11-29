import { openDB } from 'idb';
import CONFIGLEVEL2 from '../global/configLevel2';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIGLEVEL2;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const NoteiDBLevel2 = {
  async putNote(note) {
    return (await dbPromise).put(OBJECT_STORE_NAME, note);
  },
  async getAllNote() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async getNoteById(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
};
export default NoteiDBLevel2;
