import { ConnectionIssue } from "./errors/errors.js";

class Adapter {
  #StoreName;
  constructor() {
    this.totalSlots = 10;
    this.db = null;
    this.openDB();
    this.#StoreName = {
      vehicles: "Vehicle",
      slots: "Slot",
    };
  }
  setIndexDB(db) {
    this.db = db;
    console.log("dfs....", db);
  }

  getObjectStore(store_name, mode = "readwrite") {
    var tx = this.db.transaction(this.#StoreName[store_name], mode);
    return tx.objectStore(this.#StoreName[store_name]);
  }

  intializeSlots() {
    console.log("intializing db....");
    let tx = this.db.transaction(this.#StoreName["slots"], "readwrite");
    let store = tx.objectStore(this.#StoreName["slots"]);
    for (let i = 1; i <= this.totalSlots; i++) {
      store.add({
        vehicle_id: 1,
        timestamp: new Date(),
      });
    }
    tx.oncomplete = () => {
      this.db.close();
    };
  }

  openDB() {
    console.log("openDb ...");
    const req = indexedDB.open("Parking Lot", 1);
    console.log(req);
    req.onsuccess = (evt) => {
      console.log(evt.target.result);
      console.log(this);
      this.setIndexDB(evt.target.result);
      console.log("openDb DONE");
    };

    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = (evt) => {
      console.log("openDb.onupgradeneeded");
      this.setIndexDB(evt.target.result);
      var carStore = evt.currentTarget.result.createObjectStore("Vehicle", {
        keyPath: "id",
        autoIncrement: true,
      });

      var slotStore = evt.currentTarget.result.createObjectStore("Slot", {
        keyPath: "id",
        autoIncrement: true,
      });

      slotStore.createIndex("vehicle_id", "vehicle_id", { unique: true });
      slotStore.createIndex("timestamp", "timestamp", { unique: false });
    };
  }
}

export default Adapter;
