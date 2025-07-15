document.addEventListener('DOMContentLoaded', () => {
  carregarRoteadores();

  const form = document.getElementById('formulario');
  const resultadoCompletoBox = document.getElementById('resultado-completo');
  const resultadoResumidoBox = document.getElementById('resultado-resumido');

  const seletorEquipamento = document.getElementById('cpdeq');
  const campoEquipamento = document.getElementById('campo-equipamento');

  const seletorComodato = document.getElementById('comodato');
  const campoComodato = document.getElementById('campo-equipamento_com');

  // Mostrar ou ocultar campos
  seletorEquipamento.addEventListener('change', () => {
    campoEquipamento.style.display = seletorEquipamento.value === 'SIM' ? 'block' : 'none';
  });

  seletorComodato.addEventListener('change', () => {
    campoComodato.style.display = seletorComodato.value === 'SIM' ? 'block' : 'none';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

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
    let textoEquipamentos = '';
    const equipamentosVendidosArray = [];

    if (seletorEquipamento.value === 'SIM') {
      textoEquipamentos = 'EQUIPAMENTOS VENDIDOS:';

      const equipamento1 = document.getElementById('ROTEADOR')?.value || '';
      const qtd1 = document.getElementById('qtdroteador')?.value || '0';
      if (equipamento1 && qtd1 !== '0') {
        textoEquipamentos += `\n- Equipamento 1: ${equipamento1} (Qtd: ${qtd1})`;
        equipamentosVendidosArray.push(`${equipamento1}:${qtd1}`);
      }

      const linhas = document.querySelectorAll('#equipamentos-extras .linha-equipamento');
      linhas.forEach((linha, index) => {
        const select = linha.querySelector('select');
        const nome = select?.value || '';
        const qtd = linha.querySelector('input')?.value || '0';

        if (nome && qtd !== '0') {
          textoEquipamentos += `\n- Equipamento ${index + 2}: ${nome} (Qtd: ${qtd})`;
          equipamentosVendidosArray.push(`${nome}:${qtd}`);
        }
      });

      const ONU = document.getElementById('ONU_2')?.value || '';
      const box = document.getElementById('box')?.value || '';
      const cabo = document.getElementById('cabo1')?.value || '';

      if (ONU) {
        textoEquipamentos += `\n- ONU: ${ONU}`;
        equipamentosVendidosArray.push(`ONU:${ONU}`);
      }
      if (box) {
        textoEquipamentos += `\n- TV Box: ${box}`;
        equipamentosVendidosArray.push(`TV Box:${box}`);
      }
      if (cabo) {
        textoEquipamentos += `\n- Cabo: ${cabo}`;
        equipamentosVendidosArray.push(`Cabo:${cabo}`);
      }

      document.getElementById('EQUIPAMENTOS_VENDIDOS').value = equipamentosVendidosArray.join(', ');
    }

    // Equipamentos em Comodato
    let textoComodatos = '';
    const equipamentosComodatoArray = [];

    if (seletorComodato.value === 'SIM') {
      textoComodatos = 'EQUIPAMENTOS EM COMODATO:';

      const roteadorC = document.getElementById('ROTEADOR_COM')?.value || '';
      const qtdCom = document.getElementById('qtdroteador_com')?.value || '';
      if (roteadorC && qtdCom) {
        textoComodatos += `\n- Roteador: ${roteadorC} (Qtd: ${qtdCom})`;
        equipamentosComodatoArray.push(`${roteadorC}:${qtdCom}`);
      }

      const adicionais = campoComodato.querySelectorAll('.linha-equipamento select');
      adicionais.forEach((select, i) => {
        const qtd = select.nextElementSibling?.value || '';
        const nome = select.value;
        if (nome && qtd && !equipamentosComodatoArray.includes(`${nome}:${qtd}`)) {
          textoComodatos += `\n- Equipamento ${i + 2}: ${nome} (Qtd: ${qtd})`;
          equipamentosComodatoArray.push(`${nome}:${qtd}`);
        }
      });

      const onuC = document.getElementById('ONU_C')?.value || '';
      const boxC = document.getElementById('box_c')?.value || '';
      const caboC = document.getElementById('cabo_c')?.value || '';

      if (onuC) textoComodatos += `\n- ONU: ${onuC}`;
      if (boxC) textoComodatos += `\n- TV Box: ${boxC}`;
      if (caboC) textoComodatos += `\n- Cabo: ${caboC}`;

      document.getElementById('EQUIPAMENTOS_COMODATO').value = equipamentosComodatoArray.join(', ');
    }

    const resultadoCompleto = `
Adesão Nova: ${admv}
Plano: ${planosFormatados}
Valor Mensal: ${valor}
Dia do Vencimento: ${vencimento}
Valor da Adesão: ${valorads}
Fidelidade: ${fidelidade}
Nome/Telefone: ${telefone}
Endereço: ${logradouro}, ${numero}, ${bairro}, ${cidade} - ${estado}, ${complemento}
Coordenadas: ${externaLatitude} ${externaLongitude}
${textoEquipamentos ? '\n\n' + textoEquipamentos : ''}
${textoComodatos ? '\n\n' + textoComodatos : ''}
    `.trim();

    const resultadoResumido = `
Adesão Nova: ${admv}
Plano: ${planosFormatados}
Nome Contato: ${telefone}
Endereço: ${logradouro}, ${numero}, ${bairro}, ${cidade} - ${estado}, ${complemento}
Coordenadas: ${externaLatitude} ${externaLongitude}
${textoEquipamentos ? textoEquipamentos : ''}
${textoComodatos ? textoComodatos : ''}
    `.trim();

    resultadoCompletoBox.value = resultadoCompleto;
    resultadoResumidoBox.value = resultadoResumido;
  });

  // Adição de planos
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
      btnRemover.style.cssText = `
        padding: 2px 6px;
        font-size: 12px;
        line-height: 1;
        height: 28px;
        width: 28px;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        cursor: pointer;
        margin-left: 8px;
      `;

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

  // Adição de equipamentos vendidos
  const botaoAdicionarEquipamento = document.getElementById('adicionar-equipamento');
  const listaEquipamentos = document.getElementById('equipamentos-extras');

  botaoAdicionarEquipamento.addEventListener('click', () => {
    const li = document.createElement('li');
    li.className = 'linha-equipamento';
    li.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 5px;';

    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione';
    select.appendChild(defaultOption);

    listaRoteadores.forEach(equip => {
      const opt = document.createElement('option');
      opt.value = equip;
      opt.textContent = equip;
      select.appendChild(opt);
    });

    const inputQtd = document.createElement('input');
    inputQtd.type = 'number';
    inputQtd.min = 0;
    inputQtd.max = 100;
    inputQtd.placeholder = 'Qtd';
    inputQtd.style.width = '60px';

    const btnRemover = document.createElement('button');
    btnRemover.textContent = '×';
    btnRemover.type = 'button';
    btnRemover.style.cssText = `
      padding: 2px 6px;
      font-size: 12px;
      line-height: 1;
      height: 28px;
      width: 28px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 50%;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      cursor: pointer;
    `;
    btnRemover.addEventListener('click', () => li.remove());

    li.appendChild(select);
    li.appendChild(inputQtd);
    li.appendChild(btnRemover);
    listaEquipamentos.appendChild(li);
  });

  // Adição de equipamentos EM COMODATO (FUNCIONANDO)
  const botaoAdicionarEquipamentoCom = document.getElementById('adicionar-equipamento_com');
  const listaEquipamentosComodato = document.getElementById('equipamentos-comodato-extras');
  

  botaoAdicionarEquipamentoCom.addEventListener('click', () => {
    const linha = document.createElement('div');
    linha.className = 'linha-equipamento';
    linha.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-top: 5px;';

    const select = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione';
    select.appendChild(defaultOption);

    listaRoteadores.forEach(equip => {
      const opt = document.createElement('option');
      opt.value = equip;
      opt.textContent = equip;
      select.appendChild(opt);
    });

    const inputQtd = document.createElement('input');
    inputQtd.type = 'number';
    inputQtd.min = 0;
    inputQtd.max = 100;
    inputQtd.placeholder = 'Qtd';
    inputQtd.style.width = '60px';

    const btnRemover = document.createElement('button');
    btnRemover.textContent = '×';
    btnRemover.type = 'button';
    btnRemover.style.cssText = `
      padding: 2px 6px;
      font-size: 12px;
      line-height: 1;
      height: 28px;
      width: 28px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 50%;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      cursor: pointer;
    `;
    btnRemover.addEventListener('click', () => linha.remove());

    linha.appendChild(select);
    linha.appendChild(inputQtd);
    linha.appendChild(btnRemover);
    listaEquipamentosComodato.appendChild(linha);
 
  });
});
// Função para voltar
function voltarPagina() {
  history.back();
}
