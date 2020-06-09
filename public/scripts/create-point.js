// FUNÇÃO PARA INSERIR OS ESTADOS NA NOSSA API;
function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")
  const urlUF = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

fetch(urlUF)
  .then(res => res.json())
  .then(states => {
    for (let state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
  }
populateUFs();

// ZERAR A QUANTIDADE DE CIDADES TODA VEZ QUE EU TROCAR DE ESTADOS - VOLTAR AO ESTADO ORIGINAL;


function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSlectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSlectedState].text

  const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(urlCity)
    .then(res => res.json())
    .then(cities => {
      for(let city of cities){
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    // ITENS COLETA - PEGAR TODOS OS <li>
const itemsToCollect = document.querySelectorAll(".items-grid li")    

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)  
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target
  // ADICIONAR OU REMOVER CLASSES COM JAVASCRIPT
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id

  console.log('ITEM ID: ', itemId);
  

  // VERIFICAR SE EXISTEM ITENS SELECIONADOS,
  // SE TIVER, PEGAR ESSES ITENS SELECIONADOS;
  const alreadySelected = selectedItems.findIndex(function(item){
    const itemFound = item == itemId //TRUE OR FALSE;
    return itemFound
  }) 

  //SE JÁ ESTIVER SELECIONADO TIRAR DA SELEÇÃO;
  if(alreadySelected >= 0){
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId //FALSE
      return itemIsDifferent
    }) 
    selectedItems = filteredItems   
  } else {
  //SE NÃO ESTIVER SELECIONADO ADICIONAR À SELEÇÃO;
    selectedItems.push(itemId)

  }

  console.log('SELECTED ITEMS: ', selectedItems);


  //ATUALIZAR O CAMPO ESCONDIDO COM OS ITENS SELECIONADOS;  
  collectedItems.value = selectedItems
  
}