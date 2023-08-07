import { ConnectionIssue } from "./errors/errors.js";

class Adapter {
  #dbDoc;
  constructor() {
    this.totalSlots = 10;
    this.#dbDoc = {
      vehicles: "Vehicle",
      slots: "Slot",
    };
    this.initialiseDB();
  }

  readAndWrite(doc, cb, write = false) {
    try {
      let data = window.localStorage.getItem(this.#dbDoc[doc]);
      data = JSON.parse(data);
      let result = cb(data);
      if (write)
        window.localStorage.setItem(this.#dbDoc[doc], JSON.stringify(result));
      return result;
    } catch (e) {
      console.log(e);
      throw new ConnectionIssue(e.message);
    }
  }

  write(doc, data) {
    try {
      window.localStorage.setItem(this.#dbDoc[doc], JSON.stringify(data));
      return data;
    } catch (e) {
      console.log(e);
      throw new ConnectionIssue(e.message);
    }
  }
  initialiseDB() {
    if (window.localStorage.getItem(this.#dbDoc.slots) === null) {
      let slots = [];
      for (let i = 1; i <= this.totalSlots; i++) {
        slots.push({
          vehicle_id: null,
          timestamp: null,
          id: i,
        });
      }
      window.localStorage.setItem(this.#dbDoc.slots, JSON.stringify(slots));
    }
    if (window.localStorage.getItem(this.#dbDoc.vehicles) === null) {
      window.localStorage.setItem(this.#dbDoc.vehicles, JSON.stringify([]));
    }
  }
}

export default Adapter;
