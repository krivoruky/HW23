const formElem = document.forms[0]; 
const wordElem = formElem.word; 
const translationElem = formElem.translation; 
const colorElem = formElem.color; 
const productsElem = document.querySelector('#products') 
const findElem = document.querySelector('#find') 
let products = []; 
 
const get_card = () => JSON.parse(localStorage.getItem('card')) || [];
const add_card = card => localStorage.setItem('card', JSON.stringify([...get_card(),card]));
const remove_card = card =>{
    const new_list = get_card().filter(elem => elem.word !== card.word);
    localStorage.setItem('card', JSON.stringify(new_list))
}

formElem.addEventListener('submit', event => { 
  event.preventDefault(); 
  findElem.value = ''; 
  add_card({
    word: wordElem.value,
    translation: translationElem.value,
    color: colorElem.value,
    });
  rerender(get_card()); 
}); 
 
findElem.addEventListener('input', event => { 
 const value = event.target.value; 
 rerender(value.length ? get_card().filter(elem => elem.word.startsWith(value)) : get_card());
}) 
 
function rerender(words){ 
 productsElem.innerText = ''; 
 for (let i = 0; i < words.length; i++){ 
  const card = document.createElement('div'); 
  const closeElem = document.createElement('div'); 
  const cards_wordElem = document.createElement('h1'); 
 
  closeElem.addEventListener('click', () => { 
   findElem.value = ''; 
   remove_card(words[i]);
   rerender(get_card());
  }); 
 
  let change = true; 
  card.addEventListener('dblclick', () => { 
   if (change == true) { 
    cards_wordElem.innerText = get_card()[i].translation; 
    change = false; 
   } 
   else { 
    cards_wordElem.innerText = get_card()[i].word; 
    change = true 
   } 
  }); 
   
  card.classList.add('card'); 
  closeElem.classList.add('close'); 
 
  card.append(cards_wordElem, closeElem); 
  productsElem.appendChild(card); 
  cards_wordElem.innerText = words[i].word; 
  card.style.backgroundColor = words[i].color; 
  closeElem.innerText = '✖'; 
 } 
}
rerender(get_card());