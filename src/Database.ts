import fs from "fs";
import path from "path";
import os from "os";
import Collection from "./Collection";
import { CollectionItem } from ".";

class Database {
  _dbPath: string;
  /**
   *
   * @param {string} name
   */
  constructor(name: string) {
    this._dbPath = path.join(os.userInfo().homedir, `/.${name}/`);
    this._ensureStorage();
  }

  /**
   *
   * @param {string} name
   */
  collection<T extends CollectionItem>(name: string) {
    const collectionPath = path.join(this._dbPath, `${name}.json`);
    return new Collection<T>(collectionPath);
  }

  _ensureStorage() {
    if (!fs.existsSync(this._dbPath)) fs.mkdirSync(this._dbPath);
  }
}

export default Database;
