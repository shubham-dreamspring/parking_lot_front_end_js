import { ConnectionIssue } from "./errors/errors.js";

class Adapter {
  #dbDoc;
  constructor() {
    this.#dbDoc = {
      vehicles: "Vehicle",
      slots: "Slot",
    };
  }

  readAndWrite(doc, cb, write = false) {
    try {
      let data = localStorage.getItem(this.#dbDoc[doc]);
      data = JSON.parse(data);
      let result = cb(data);
      if (write) localStorage.setItem(this.#dbDoc[doc], JSON.stringify(result));
      return result;
    } catch (e) {
      console.log(e);
      throw new ConnectionIssue(e.message);
    }
  }

  write(doc, data) {
    try {
      localStorage.setItem(this.#dbDoc[doc], JSON.stringify(data));
      return data;
    } catch (e) {
      console.log(e);
      throw new ConnectionIssue(e.message);
    }
  }

  read(doc) {
    try {
      const data = localStorage.getItem(this.#dbDoc[doc]);
      return data;
    } catch (e) {
      console.log(e);
      throw new ConnectionIssue(e.message);
    }
  }
}

export default Adapter;
