class CarListComponent extends HTMLElement {
  constructor() {
    super();
  }
  listContent(listData = []) {
    return `
  <div class="row">
  <div class="col">
  ${
    listData.length !== 0
      ? `<table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Registration No.</th>
        <th scope="col">Slot</th>
      </tr>
    </thead>
    <tbody>
    ${listData
      .map(
        (carItem, index) =>
          `<tr>
        <th>${index+1}</th>
        <td>${carItem.registration_no}</td>
        <td>${carItem.slot_id}</td>
      </tr>`
      )
      .join("\n")}
    </tbody>
  </table>`
      : '<h4 class="text-center lead">No car yet parked</h4>'
  }
</div>
</div>
     `;
  }
  setListData(data) {
    this.innerHTML = this.listContent(data);
  }
  connectedCallback() {
    this.innerHTML = this.listContent();
  }
}
customElements.define("car-list-component", CarListComponent);
