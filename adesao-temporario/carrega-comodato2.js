const apiKey = "AIzaSyCFP7lBEpVe32B_jqyWVVDYXdr7cnirpcU";
const sheetId = "1an_PVl1zh0r7WCa-iGU8G4aT0e6vMdZxJyJiLKPAWZQ";
const rangeC = "C2:C"; // Roteadores
const rangeD = "D2:D"; // ONUs
const rangeE = "E2:E"; // Boxes
const rangeF = "F2:F"; // Cabos

// Roteador Vendido (ROTEADORWS) + Roteador Comodato (ROTEADOR_C)
async function carregarRoteadores() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeC}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const valores = data.values?.flat() || [];

    const roteadorVendidos = document.getElementById("ROTEADORWS");
    const roteadorComodato = document.getElementById("ROTEADOR_C");

    valores.forEach(item => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");

      option1.value = item;
      option1.textContent = item;
      roteadorVendidos.appendChild(option1);

      option2.value = item;
      option2.textContent = item;
      roteadorComodato.appendChild(option2);
    });
  } catch (error) {
    console.error("Erro ao carregar roteadores:", error);
  }
}

// ONU Vendida (ONU_2) + ONU Comodato (ONU_C)
async function carregarONUs() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeD}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const valores = data.values?.flat() || [];

    const onuVendida = document.getElementById("ONU_2");
    const onuComodato = document.getElementById("ONU_C");

    valores.forEach(item => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");

      option1.value = item;
      option1.textContent = item;
      onuVendida.appendChild(option1);

      option2.value = item;
      option2.textContent = item;
      onuComodato.appendChild(option2);
    });
  } catch (error) {
    console.error("Erro ao carregar ONUs:", error);
  }
}

// Box Vendido (box) + Box Comodato (box_c)
async function carregarBoxes() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeE}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const valores = data.values?.flat() || [];

    const boxVendido = document.getElementById("box");
    const boxComodato = document.getElementById("box_c");

    valores.forEach(item => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");

      option1.value = item;
      option1.textContent = item;
      boxVendido.appendChild(option1);

      option2.value = item;
      option2.textContent = item;
      boxComodato.appendChild(option2);
    });
  } catch (error) {
    console.error("Erro ao carregar Boxes:", error);
  }
}

// Cabo Vendido (cabo1) + Cabo Comodato (cabo_c)
async function carregarCabos() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeF}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const valores = data.values?.flat() || [];

    const caboVendido = document.getElementById("cabo1");
    const caboComodato = document.getElementById("cabo_c");

    valores.forEach(item => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");

      option1.value = item;
      option1.textContent = item;
      caboVendido.appendChild(option1);

      option2.value = item;
      option2.textContent = item;
      caboComodato.appendChild(option2);
    });
  } catch (error) {
    console.error("Erro ao carregar Cabos:", error);
  }
}

// Inicializar tudo ao carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
  carregarRoteadores();
  carregarONUs();
  carregarBoxes();
  carregarCabos();
});