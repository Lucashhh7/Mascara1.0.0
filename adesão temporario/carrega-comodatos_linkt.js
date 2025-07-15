document.addEventListener("DOMContentLoaded", function () {
  const selectComodato = document.getElementById("comodato");
  const campoComodato = document.getElementById("campo-comodato");

  selectComodato.addEventListener("change", function () {
    campoComodato.style.display = this.value === "SIM" ? "block" : "none";
  });
});
async function carregarRoteadores() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeC}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    listaRoteadores = data.values?.flat() || [];
    // Preenche os selects fixos normalmente
    popularSelects(listaRoteadores, "ROTEADOR", "ROTEADOR_C");
  } catch (error) {
    console.error("Erro ao carregar roteadores:", error);
  }
}








