function renderErrorMessage(message, action) {
  if (!action) {
    alert(message);
  }
  document.getElementById(`error-div-${action}`).classList.remove("d-none");
  document.getElementById(`error-div-${action}`).innerHTML = `
      <h4 class="d-inline text-danger">${message}</h4>`;
}

const errorHandler = (error, action = null) => {
  console.log(`error ${error.message}`);
  renderErrorMessage(error.message || "Something went Wrong", action);
};

export default errorHandler;
