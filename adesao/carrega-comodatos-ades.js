document.addEventListener("DOMContentLoaded", function () {
  const selectComodato = document.getElementById("comodato");
  const campoComodato = document.getElementById("campo-comodato");

  selectComodato.addEventListener("change", function () {
    campoComodato.style.display = this.value === "SIM" ? "block" : "none";
  });
});







