class CarFormComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <form
      class="d-flex mt-2"
      id="car-form-${this.getAttribute("action")}"
    >
      <input
        type="text"
        class="form-control w-50"
        id="registration-no-${this.getAttribute("action")}"
        name="registration_no"
        placeholder="Registration No."
        maxlength="10"
        minlength="10"
      />
      <button type="submit" class="btn btn-primary d-inline-block ms-2">${this.getAttribute(
        "btn-text"
      )}
      </button>
    
    </form>`;
  }
}

customElements.define("car-form-component", CarFormComponent);
