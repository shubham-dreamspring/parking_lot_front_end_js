class ParkCarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <h3>Hey park here :)</h3>
      <div class="row flex-column">
        <div class="col">
        <car-form-component btn-text="PARK" action="park"></car-form-component>
        </div>
        <div class="col d-none" id="success-div-park">
          Your parking slot is:  <h4 class=" d-inline text-success" id="slot-id"></h4>
        </div>
        <div class="col d-none" id="error-div-park">
          <h4 class=" d-inline text-warning" id="slot-id"></h4>
        </div>
      </div>`;
  }
}

customElements.define("park-car-component", ParkCarComponent);
