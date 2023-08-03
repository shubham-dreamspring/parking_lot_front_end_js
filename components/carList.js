class CarListComponent extends HTMLElement {
  constructor() {
    super();
    this.listData = [{ registration_no: "UP123456789", slot_id: "A2" }];
  }

  connectedCallback() {
    this.innerHTML = `
      <div class='row'>
      <div class='col'>
      ${
        this.listData.length !== 0
          ? `<table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Registration No.</th>
            <th scope="col">Slot</th>
          </tr>
        </thead>
        <tbody>
        ${this.listData.map(
          (carItem, index) =>
            `<tr>
            <th>${index}</th>
            <td>${carItem.registration_no}</td>
            <td>${carItem.slot_id}</td>
          </tr>`
        )}
        </tbody>
      </table>`
          : '<h4 class="text-center lead">No car yet parked</h4>'
      }
    </div>
    </div>
         `;
  }
}

customElements.define("car-list-component", CarListComponent);
