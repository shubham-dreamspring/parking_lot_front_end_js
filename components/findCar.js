class FindCarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <h3>Find your car :)</h3>
      <div class="row flex-column">
        <div class="col">
        <car-form-component btn-text="Find Car" action="unpark"></car-form-component>
        </div>
        <div class="col d-none" id="success-div-unpark">
        </div>
        <div class="col d-none" id="error-div-unpark"></div>
      </div>`;
  }
}

customElements.define("find-car-component", FindCarComponent);
