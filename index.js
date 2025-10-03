// MINA ARRAYS / CARDS
const recipes = [
  {
    title: "Burrata Board",
    cuisine: "Italian",
    time: 25,
    image: "assets/img/Burrataboard-med-persika-och-mynta-768x1024.jpg",
    alt: "Burrata with peach and mint",
    ingredients: [
      "Burrata", 
      "Persika", 
      "Färsk mynta", 
      "Olivolja", 
      "Flingsalt", 
      "Svartpeppar", 
      "Rostad baguette"
    ]
  },
  {
    title: "Margherita",
    cuisine: "Italian",
    time: 30,
    image: "assets/img/Margharita-740429.jpg",
    alt: "Pizza Margherita",
    ingredients: [
      "Pizzadeg", 
      "Krossade tomater", 
      "Mozzarella", 
      "Färsk basilika", 
      "Olivolja", 
      "Salt"
    ]
  },
  {
    title: "Cheeseburger",
    cuisine: "American",
    time: 25,
    image: "assets/img/cheeseburgers.jpg",
    alt: "Cheeseburger",
    ingredients: [
      "Nötfärs", 
      "Hamburgerbröd", 
      "Cheddar", "Salt & peppar", 
      "Lök", "Tomat", "Sallad", 
      "Pickles", 
      "Ketchup & senap"
    ]
  },
  {
    title: "Mac and Cheese",
    cuisine: "American",
    time: 25,
    image: "assets/img/mac_and_cheese_med_panko.jpg",
    alt: "Mac and cheese",
    ingredients: [
      "Makaroner", 
      "Smör", 
      "Mjöl", 
      "Mjölk", 
      "Cheddar", 
      "Panko", 
      "Salt", 
      "Peppar"
    ]
  },
  {
    title: "Pad Thai",
    cuisine: "Asian",
    time: 30,
    image: "assets/img/pad_thai_.jpg",
    alt: "Pad Thai",
    ingredients: [
      "Rispasta", 
      "Ägg", 
      "Tofu/kyckling", 
      "Böngroddar", 
      "Jordnötter", 
      "Lime",
      "Tamarind",
      "Fisk-/sojasås", 
      "Socker"
    ]
  },
  {
    title: "California Rolls",
    cuisine: "Asian",
    time: 40,
    image: "assets/img/sushi-california-rolls.jpg.webp",
    alt: "California rolls",
    ingredients: [
      "Sushiris", 
      "Nori", 
      "Krabbsticks", 
      "Avokado", 
      "Gurka", 
      "Majonnäs", 
      "Sesamfrön", 
      "Risvinäger"
    ]
  },
  {
    title: "Moules Frites",
    cuisine: "Belgian",
    time: 45,
    image: "assets/img/moules_frites.jpg",
    alt: "Mussels with fries",
    ingredients: [
      "Musslor", 
      "Schalottenlök", 
      "Vitlök", 
      "Vitt vin", 
      "Grädde", 
      "Persilja", 
      "Pommes frites"
    ]
  },
  {
    title: "Belgian Waffles",
    cuisine: "Belgian",
    time: 20,
    image: "assets/img/belgiska_vafflor.jpg",
    alt: "Belgian waffles",
    ingredients: [
      "Vetemjöl", 
      "Ägg", 
      "Mjölk", 
      "Smör", 
      "Socker", 
      "Bakpulver", 
      "Vanilj", 
      "Nypa salt"
    ]
  }
]

// ===== 2) Hitta container att rita i =====
const container =
  document.querySelector('.recipe-grid') ||
  document.getElementById('recipe-cards');

// ===== 3) Små hjälpfunktioner =====
function normCuisine(s) {
  // Normalisera till gemener, ta bort mellanslag och mappa varianter
  const k = String(s).toLowerCase().replace(/\s+/g,'');
  if (k === 'asia') return 'asian';
  if (k === 'belgia') return 'belgian';
  return k; // italian, american, asian, belgian
}
function displayCuisine(s) {
  // Visa snyggt (för text i kortet)
  const k = normCuisine(s);
  return k.charAt(0).toUpperCase() + k.slice(1);
}

// ===== 4) Rendera kort =====
function render(list) {
  if (!container) return;
  container.innerHTML = (list || []).map(recipe => {
    const cuisineKey = normCuisine(recipe.cuisine);
    return `
      <article class="recipe-card" data-cuisine="${cuisineKey}" data-time="${recipe.time}">
        <img src="${recipe.image}" alt="${recipe.alt}">
        <div class="recipe-card-inventory">
          <h3 class="recipe-card-title">${recipe.title}</h3>
          <p class="recipe-card-cuisine">${displayCuisine(recipe.cuisine)}</p>
          <p class="recipe-card-time">${recipe.time} | mins</p>
          <h3 class="recipe-card-ingredients">Ingredients</h3>
          <h4 class="recipe-card-ingredients-list"></h4>
          <ul class="items">
            ${recipe.ingredients.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </article>
    `;
  }).join('');

  // Tom-state om inget hittades
  if (!list || list.length === 0) {
    container.innerHTML = `<p class="empty">Inga recept hittades.</p>`;
  }
}

// ===== 5) Filtrering + sortering =====
let currentFilter = 'all';   // 'all' eller en cuisine
let currentSort   = null;    // null | 'asc' | 'desc'

function getFilteredSorted() {
  const key = normCuisine(currentFilter);
  let list = (key === 'all')
    ? recipes
    : recipes.filter(r => normCuisine(r.cuisine) === key);

  if (currentSort === 'asc')  list = [...list].sort((a,b) => a.time - b.time);
  if (currentSort === 'desc') list = [...list].sort((a,b) => b.time - a.time);

  return list;
}

function updateView() {
  render(getFilteredSorted());
}

// ===== 6) Knappar: filter, sort, random =====
const filterBtns = document.querySelectorAll('.btn[data-filter]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter; // tex 'all', 'italian', 'american', 'asia', 'belgia'
    // Markera aktiv knapp (valfritt, kräver CSS .active)
    filterBtns.forEach(b => b.classList.toggle('active', b === btn));
    updateView();
  });
});

//Här har vi sorteringsknapparna ascending / descending.
const sortBtns = document.querySelectorAll('.btn-time[data-sort]');
sortBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentSort = btn.dataset.sort; // 'asc' eller 'desc'
    sortBtns.forEach(b => b.classList.toggle('active', b === btn));
    updateView();
  });
});

// random button
const randomBtn = document.querySelector('.btn-random');
if (randomBtn) {
  randomBtn.addEventListener('click', () => {
    const list = getFilteredSorted();
    if (!list.length) return;
    const pick = list[Math.floor(Math.random() * list.length)];
    render([pick]);
  });
}

// ===== 7) Första render =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateView, { once: true });
} else {
  updateView();
}

