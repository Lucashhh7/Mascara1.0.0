document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const resultadoCompletoBox = document.getElementById('resultado-completo');
  const resultadoResumidoBox = document.getElementById('resultado-resumido');
  const seletorEquipamento = document.getElementById('cpdeq');
  const campoEquipamento = document.getElementById('campo-equipamento');

  const seletorComodato = document.getElementById('comodato');
  const campoComodato = document.getElementById('campo-comodato');

  // Mostrar ou ocultar os campos de equipamento vendido
  seletorEquipamento.addEventListener('change', () => {
    campoEquipamento.style.display = seletorEquipamento.value === 'SIM' ? 'block' : 'none';
  });

  // Mostrar ou ocultar os campos de comodato
  seletorComodato.addEventListener('change', () => {
    campoComodato.style.display = seletorComodato.value === 'SIM' ? 'block' : 'none';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Dados principais
    const admv = document.getElementById('ADNV').value;
    const planoBruto = document.getElementById('PLANO').value;
    const planosArray = planoBruto ? planoBruto.split(',') : [];
    const planosFormatados = planosArray.map(p => `- ${p}`).join('\n');
    const valor = document.getElementById('VALOR').value.trim();
    const vencimento = document.getElementById('VENCIMENTO').value.trim();
    const valorads = document.getElementById('VALORADS').value.trim();
    const fidelidade = document.getElementById('FIDELIDADE').value.trim();
    const telefone = document.getElementById('TELEFONE').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const complemento = document.getElementById('complemento').value.trim();

    const logradouro = document.getElementById('logradouro')?.textContent || '';
    const bairro = document.getElementById('bairro')?.textContent || '';
    const cidade = document.getElementById('localidade')?.textContent || '';
    const estado = document.getElementById('uf')?.textContent || '';

    const externaLatitude = window.latitude || '';
    const externaLongitude = window.longitude || '';

    // Equipamentos Vendidos
    const compraEquipamento = seletorEquipamento.value;
    let textoEquipamentos = '';

    if (compraEquipamento === 'SIM') {
      const roteador = document.getElementById('ROTEADOR')?.value || '';
      const qtdroteador = document.getElementById('qtdroteador')?.value || '0';
      const roteadorws = document.getElementById('ROTEADORWS')?.value || '';
      const qtdroteadorZ = document.getElementById('qtdroteadorZ')?.value || '0';
      const ONU_2 = document.getElementById('ONU_2')?.value || '';
      const qtdonu = document.getElementById('qtdonu')?.value || '0';
      const box = document.getElementById('box')?.value || '';
      const qtdbox = document.getElementById('qtdbox')?.value || '0';
      const cabo1 = document.getElementById('cabo1')?.value || '';
      const qtdcabo = document.getElementById('qtdcabo')?.value || '0';

      textoEquipamentos = 'Equipamentos Vendidos:'.toUpperCase();

      if (roteador && qtdroteador !== '0') {
        textoEquipamentos += `\n- Roteador: ${roteador} (Qtd: ${qtdroteador})`;
      }
      if (roteadorws && qtdroteadorZ !== '0') {
        textoEquipamentos += `\n- Roteador: ${roteadorws} (Qtd: ${qtdroteadorZ})`;
      }
      if (ONU_2 && qtdonu !== '0') {
        textoEquipamentos += `\n- ONU: ${ONU_2} (Qtd: ${qtdonu})`;
      }
      if (box && qtdbox !== '0') {
        textoEquipamentos += `\n- TV Box: ${box} (Qtd: ${qtdbox})`;
      }
      if (cabo1 && qtdcabo !== '0') {
        textoEquipamentos += `\n- Cabo: ${cabo1} (Qtd: ${qtdcabo})`;
      }
    }

    // Equipamentos em Comodato
    const comodatoEquipamento = seletorComodato.value;
    let textoComodatos = '';

    if (comodatoEquipamento === 'SIM') {
      const roteadorC = document.getElementById('ROTEADOR_C')?.value || '';
      const qtdRoteadorC = document.getElementById('qtdroteador_c')?.value || '0';
      const roteadorC1 = document.getElementById('ROTEADOR_C1')?.value || '';
      const qtdRoteadorC1 = document.getElementById('qtdroteador_c1')?.value || '0';
      const onuC = document.getElementById('ONU_C')?.value || '';
      const qtdOnuC = document.getElementById('qtdonu_c')?.value || '0';
      const boxC = document.getElementById('box_c')?.value || '';
      const qtdBoxC = document.getElementById('qtdbox_c')?.value || '0';
      const caboC = document.getElementById('cabo_c')?.value || '';
      const qtdCaboC = document.getElementById('qtdcabo_c')?.value || '0';

      
      // Equipamentos em Comodato
      textoComodatos = 'Equipamentos em Comodato:'.toUpperCase();

      if (roteadorC && qtdRoteadorC !== '0') {
        textoComodatos += `\n- Roteador: ${roteadorC} (Qtd: ${qtdRoteadorC})`;
      }
      if (roteadorC && qtdRoteadorC1 !== '0') {
        textoComodatos += `\n- Roteador: ${roteadorC1} (Qtd: ${qtdRoteadorC1})`;
      }
      if (onuC && qtdOnuC !== '0') {
        textoComodatos += `\n- ONU: ${onuC} (Qtd: ${qtdOnuC})`;
      }
      if (boxC && qtdBoxC !== '0') {
        textoComodatos += `\n- TV Box: ${boxC} (Qtd: ${qtdBoxC})`;
      }
      if (caboC && qtdCaboC !== '0') {
        textoComodatos += `\n- Cabo: ${caboC} (Qtd: ${qtdCaboC})`;
      }
    }

    // Resultado Completo
    let resultadoCompleto = `
Adesão Nova: ${admv}
Plano:${planosFormatados}
Valor Mensal: ${valor}
Dia do Vencimento: ${vencimento}
Valor da Adesão: ${valorads}
Fidelidade: ${fidelidade}
Nome Contato: ${telefone}
Endereço: ${logradouro}, ${numero}, ${bairro}, ${cidade} - ${estado}, ${complemento}
Coordenadas: ${externaLatitude} ${externaLongitude}
`;

    if (textoEquipamentos) resultadoCompleto += `\n\n${textoEquipamentos}`;
    if (textoComodatos) resultadoCompleto += `\n\n${textoComodatos}`;

    // Resultado Resumido
    let resultadoResumido = `
Adesão Nova: ${admv}    
Plano:${planosFormatados}
Nome Contato: ${telefone}
Endereço: ${logradouro}, ${numero}, ${bairro}, ${cidade} - ${estado}, ${complemento}
Coordenadas: ${externaLatitude} ${externaLongitude}
`;

    if (textoEquipamentos) resultadoResumido += `\n${textoEquipamentos}`;
    if (textoComodatos) resultadoResumido += `\n${textoComodatos}`;

    resultadoCompletoBox.value = resultadoCompleto.trim();
    resultadoResumidoBox.value = resultadoResumido.trim();
  });
});
const planoSelect = document.getElementById('PLANO_SELECT');
const planoHidden = document.getElementById('PLANO');
const listaPlanos = document.getElementById('planos-lista');
const botaoAdicionarPlano = document.getElementById('adicionar-plano');

botaoAdicionarPlano.addEventListener('click', () => {
  const valor = planoSelect.value;
  const texto = planoSelect.options[planoSelect.selectedIndex]?.text;

  if (valor && !planoHidden.value.split(',').includes(valor)) {
    const li = document.createElement('li');
    li.textContent = texto + ' ';

    const btnRemover = document.createElement('button');
btnRemover.textContent = '×';
btnRemover.type = 'button';
btnRemover.style.padding = '2px 6px';
btnRemover.style.fontSize = '12px';
btnRemover.style.lineHeight = '1';
btnRemover.style.height = '28px';
btnRemover.style.width = '28px';
btnRemover.style.backgroundColor = '#f44336';
btnRemover.style.color = 'white';
btnRemover.style.border = 'none';
btnRemover.style.borderRadius = '50%';
btnRemover.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
btnRemover.style.cursor = 'pointer';
btnRemover.style.marginLeft = '8px';


    btnRemover.addEventListener('click', () => {
      li.remove();
      const planos = planoHidden.value.split(',').filter(p => p !== valor);
      planoHidden.value = planos.join(',');
    });

    li.appendChild(btnRemover);
    listaPlanos.appendChild(li);

    planoHidden.value += planoHidden.value ? `,${valor}` : valor;
  }
});
// Função para voltar
function voltarPagina() {
  history.back();
}

