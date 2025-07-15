const apiKey = "AIzaSyCFP7lBEpVe32B_jqyWVVDYXdr7cnirpcU";
const sheetId = "1an_PVl1zh0r7WCa-iGU8G4aT0e6vMdZxJyJiLKPAWZQ";
const rangeA = "A2:A"; // Planos
const rangeC = "C2:C"; // Roteadores
const rangeC1 = "C2:C"; // Roteadores2
const rangeD = "D2:D"; // ONUs
const rangeE = "E2:E"; // Box
const rangeF = "F2:F"; // Cabos

// Helper: adiciona opções para múltiplos elementos select
function popularSelects(valores, ...ids) {
  ids.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      valores.forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
      });
    }
  });
}

async function carregarPlanos() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeA}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const planos = data.values?.flat() || [];
    popularSelects(planos, "PLANO_SELECT");
  } catch (error) {
    console.error("Erro ao carregar os planos:", error);
  }
}

async function carregarRoteadores() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeC}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const roteadores = data.values?.flat() || [];
    popularSelects(roteadores, "ROTEADOR", "ROTEADORWS", "ROTEADOR_C");
  } catch (error) {
    console.error("Erro ao carregar roteadores:", error);
  }
}

async function carregarONUs() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeD}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const onus = data.values?.flat() || [];
    popularSelects(onus, "ONU_2", "ONU_C");
  } catch (error) {
    console.error("Erro ao carregar ONUs:", error);
  }
}

async function carregarBoxes() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeE}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const boxes = data.values?.flat() || [];
    popularSelects(boxes, "box", "box_c");
  } catch (error) {
    console.error("Erro ao carregar boxes:", error);
  }
}

async function carregarCabos() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeF}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cabos = data.values?.flat() || [];
    popularSelects(cabos, "cabo1", "cabo_c");
  } catch (error) {
    console.error("Erro ao carregar cabos:", error);
  }
}

async function carregarROTEADOR_C1() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeC1}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const ROTEADOR_C1 = data.values?.flat() || [];
    popularSelects(ROTEADOR_C1, "ROTEADOR_C1", "ROTEADOR_C1");
  } catch (error) {
    console.error("Erro ao carregar ROTEADOR:", error);
  }
}

async function carregarROTEADOR_23() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeC1}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const ROTEADOR_23 = data.values?.flat() || [];
    popularSelects(ROTEADOR_23, "ROTEADOR23", "ROTEADOR23");
  } catch (error) {
    console.error("Erro ao carregar ROTEADOR:", error);
  }
}

async function carregarROTEADOR_COM() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rangeC1}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const ROTEADOR_COM = data.values?.flat() || [];
    popularSelects(ROTEADOR_COM, "ROTEADOR_COM", "ROTEADOR_COM");
  } catch (error) {
    console.error("Erro ao carregar ROTEADOR:", error);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  carregarPlanos();
  carregarRoteadores();
  carregarONUs();
  carregarBoxes();
  carregarCabos();
  carregarROTEADOR_C1();
  carregarROTEADOR_23();
  carregarROTEADOR_COM();
});