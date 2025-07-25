/*
  Mealmate by Adriana
  All rights reserved © 2025
*/

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const mealList = document.getElementById('meal-list');
const totalCaloriesEl = document.getElementById('total-calories');
const totalProteinEl = document.getElementById('total-protein');
const clearBtn = document.getElementById('clear-btn');

let totalCalories = 0;
let totalProtein = 0;

const foodData = [
  { name: "Boiled Egg", calories: 78, protein: 6 },
  { name: "Fried Chicken", calories: 320, protein: 20 },
  { name: "Oatmeal", calories: 150, protein: 5 },
  { name: "Banana", calories: 89, protein: 1.1 },
  { name: "Steamed Rice", calories: 204, protein: 4.2 },
  { name: "Grilled Fish", calories: 232, protein: 22 },
  { name: "Bread (1 slice)", calories: 70, protein: 2 },
  { name: "Apple", calories: 95, protein: 0.5 },
  { name: "Avocado", calories: 160, protein: 2 },
  { name: "Carrots", calories: 41, protein: 0.9 },
  { name: "Tofu", calories: 144, protein: 15 },
  { name: "Cheese", calories: 113, protein: 7 },
  { name: "Beef Steak", calories: 271, protein: 25 },
  { name: "Milk (1 cup)", calories: 103, protein: 8 },
  { name: "Yogurt", calories: 59, protein: 10 }
];

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  searchResults.innerHTML = '';

  if (!keyword) return;

  const matches = foodData.filter(item => item.name.toLowerCase().includes(keyword));

  if (matches.length === 0) {
    searchResults.innerHTML = '<li>No matches found</li>';
    return;
  }

  matches.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} — ${item.calories} kcal, ${item.protein}g protein</span>
      <button class="add-btn">Add</button>
    `;

    li.querySelector('.add-btn').addEventListener('click', () => {
      addToMeal(item);
    });

    searchResults.appendChild(li);
  });
});

function addToMeal(item) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${item.name} — ${item.calories} kcal, ${item.protein}g protein</span>
    <button class="remove-btn">❌</button>
  `;

  li.querySelector('.remove-btn').addEventListener('click', () => {
    li.remove();
    totalCalories -= item.calories;
    totalProtein -= item.protein;
    updateTotals();
  });

  mealList.appendChild(li);

  totalCalories += item.calories;
  totalProtein += item.protein;
  updateTotals();
}

function updateTotals() {
  totalCaloriesEl.textContent = totalCalories.toFixed(1);
  totalProteinEl.textContent = totalProtein.toFixed(1);
}

clearBtn.addEventListener('click', () => {
  mealList.innerHTML = '';
  totalCalories = 0;
  totalProtein = 0;
  updateTotals();
});
