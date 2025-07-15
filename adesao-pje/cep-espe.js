let map;

async function buscarEndereco() {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  if (cep.length !== 8) {
    alert("CEP inválido");
    return;
  }

  const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const dados = await resposta.json();

  if (dados.erro) {
    alert("CEP não encontrado");
    return;
  }

  document.getElementById("logradouro").textContent = dados.logradouro;
  document.getElementById("bairro").textContent = dados.bairro;
  document.getElementById("localidade").textContent = dados.localidade;
  document.getElementById("uf").textContent = dados.uf;

  
  const numero = document.getElementById("numero").value.trim();
  const enderecoCompleto = `${dados.logradouro}, ${numero}, ${dados.localidade}, ${dados.uf}`;

  const geo = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(enderecoCompleto)}`
  );
  const resultado = await geo.json();

 if (resultado.length > 0) {
  latitude = resultado[0].lat;
  longitude = resultado[0].lon;

  if (!map) {
    map = L.map("map").setView([latitude, longitude], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
  } else {
    map.setView([latitude, longitude], 15);
  }

  L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(enderecoCompleto)
    .openPopup();
}
}