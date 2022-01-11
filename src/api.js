// src/api.js
const SUPABASE_URL = "https://pewrlzqojhfvwvsfluri.supabase.co/rest/v1/todos";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyMzYzMywiZXhwIjoxOTU3Mzk5NjMzfQ.EEGfZceJhWH6wCVD56c9IHiY_jeVb2tNNThCQiOjclI";

/**
 * Récupère une tâche sur Supabase grâce à son identifiant
 * @param {number} id 
 * @returns Promise<{id: number, text: string, done: boolean}>
 */
 export const loadTodoItemFromApi = (id) => {
    return fetch(`${SUPABASE_URL}?id=eq.${id}`, {
        headers: {
            "Content-Type": "application/json",
            apiKey: SUPABASE_API_KEY,
            Prefer: "return=representation",
        },
    })
        .then((response) => response.json())
        .then((items) => items[0]);
};

export const loadTodoItemsFromApi = () => {
    return fetch(`${SUPABASE_URL}?order=created_at`, {
      headers: {
        apiKey: SUPABASE_API_KEY,
      },
    }).then((response) => response.json());
  };

  /**
 * Créé une nouvelle tâche dans Supabase
 * @returns Promise<{id: number, text: string, done: boolean}>
 */
export const saveTodoItemToApi = (item) => {
  return fetch(`${SUPABASE_URL}`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_KEY,
      Prefer: "return=representation",
    },
  }).then((response) => response.json());
};