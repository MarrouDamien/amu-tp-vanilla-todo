// src/app.js

// On créé ici un tableau TODO_ITEMS qui contient deux objets 
const TODO_ITEMS = [
    { id: 1, text: "Faire les courses", done: false },
    { id: 2, text: "Aller chercher les enfants", done: true },
  ];
  
  // Nous créons une fonction qui servira à ajouter un élément dans le UL à partir d'un objet tâche
  const addTodo = (item) => {
      // On sélectionne le <ul>
    const container = document.querySelector("ul");
  
    // On ajoute du HTML à la fin du <ul>
    container.insertAdjacentHTML(
      "beforeend",
      `
          <li>
              <label>
                  <input type="checkbox" id="todo-${item.id}" ${item.done ? "checked" : ""} /> 
                  ${item.text}
              </label>
          </li>
      `
    );
  };
  
  // Pour chaque élément du tableau TODO_ITEMS, on appelle la fonction addTodo en fournissant
  // l'item
  TODO_ITEMS.forEach((item) => addTodo(item));

  // src/app.js

// On souhaite réagir à chaque fois que le formulaire est soumis
document.querySelector("form").addEventListener("submit", (event) => {
    // On souhaite aussi empêcher le rechargement de la page
    event.preventDefault();
  
    // On récupère l'input
    const input = document.querySelector('input[name="todo-text"]');
  
    // On créé une nouvelle tâche avec pour text la valeur tapée dans l'input
    const item = {
      text: input.value,
      done: false,
    };
   fetch(SUPABASE_URL, {
           method: "POST",
           body: JSON.stringify(item),
           headers: {
               "Content-Type": "application/json",
               apiKey: SUPABASE_API_KEY,
               Prefer: "return=representation",
           },
       })
       .then((response) => response.json())
       .then((items) => {
         addTodo(items[0]);
         input.value = "";
         input.focus();
       });


  });

  const SUPABASE_URL = "https://pewrlzqojhfvwvsfluri.supabase.co/rest/v1/todos";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyMzYzMywiZXhwIjoxOTU3Mzk5NjMzfQ.EEGfZceJhWH6wCVD56c9IHiY_jeVb2tNNThCQiOjclI";

// Lorsque les éléments du DOM sont tous connus
document.addEventListener("DOMContentLoaded", () => {
  // Appel HTTP vers Supabase
  fetch(`${SUPABASE_URL}?order=created_at`, {
    headers: {
      apiKey: SUPABASE_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((items) => {
      items.forEach((item) => addTodo(item));
    });
});