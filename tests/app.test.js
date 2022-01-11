// tests/app.test.js

import { loadTodoItemsFromApi, saveTodoItemToApi } from "../src/api";
import { displayTodoList } from "../src/ui";
import { tick } from "./utils";

// On explique à Jest que toutes les fonctions du fichier src/api.js seront mockées :
// Jest va donc créer de fausses fonctions qui vont remplacer les vraies.
// Il nous donnera en plus la possibilité de contrôler les valeurs de retour, et nous permettra aussi de contrôler le fait que telle ou telle fonction a bien été appelée
jest.mock("../src/api");

// Testons que l'application affichera bien les tâches en provenance de l'API
it("displays todo items from API", async () => {

    // Simulons un document HTML qui aurait un élément <main>
    document.body.innerHTML = `
        <main></main>
      `;

    // On explique ici à la fausse fonction loadTodoItemsFromApi que quand elle sera appelée
    // Elle devra retourner un tableau contenant 2 tâches
    loadTodoItemsFromApi.mockResolvedValue([
        { id: 1, text: "MOCK_TODO", done: false },
        { id: 2, text: "MOCK_TODO_2", done: true },
    ]);

    // Appelons displayTodoList() afin de constater ensuite du résultat
    displayTodoList();

    // Comme displayTodoList() fait un travail asynchrone (l'appel à l'API, même si en réalité l'API ne sera pas appelée, ça reste une Promesse et donc un travail asynchrone)
    // On attend la fonction tick() qui permet de simuler une petite attente
    await tick();

    // Après l'attente, le HTML doit avoir été modifié par la fonction displayTodoList() :
    // On s'attend à ce que <main> contienne désormais un <ul>
    expect(document.querySelector("main ul")).not.toBeNull();
    // On s'attend à ce que le <ul> contienne 2 <li>
    expect(document.querySelectorAll("ul li").length).toBe(2);
    // On s'attend à ce que le premier <li> contienne le texte MOCK_TODO
    expect(document.querySelector("ul li").textContent).toContain("MOCK_TODO");
    // On s'attend à ce que le deuxième <li> contienne le texte MOCK_TODO_2
    expect(document.querySelector("ul li:nth-child(2)").textContent).toContain("MOCK_TODO_2");
});

// Testons qu'on peut ajouter une tâche avec le formulaire
it("should add a todo item", async () => {
  // Imaginons que l'API ne renvoie aucune tâche déjà enregistrée
  loadTodoItemsFromApi.mockResolvedValue([]);
  // Et partons du principe que lorsqu'on va sauvegarder une tâche dans Supabase, celle-ci va nous retourner cette tâche tel que :
  saveTodoItemToApi.mockResolvedValue([
      { id: 1, text: "MOCK_TASK", done: false },
  ]);

  // On simule un document HTML qui contient un élément <main>
  document.body.innerHTML = `
      <main></main>
    `;

  // On appelle displayTodoList() dont le but est d'afficher la liste ET le formulaire
  displayTodoList();

  // On peut désormais manipuler le formulaire
  // Donnons la valeur MOCK_TASK a notre <input />
  document.querySelector('input[type=text]').value = "MOCK_TASK";
  // Puis nous soumettons le formulaire
  document.querySelector('form').submit();

  // Normalement, cela devrait déclencher la fonction onSubmitForm() et donc l'appel HTTP à Supabase
  // Puis l'ajout d'une nouvelle tâche dans le <ul>
  // Comme on a de l'asynchrone, on simule une petite attente :
  await tick();

  // Et on s'attend à trouver un <li> dans le <ul> (la tâche qu'on vient d'ajouter)
  expect(document.querySelectorAll('ul li').length).toBe(1);
  // Vous pourriez ajouter d'autres vérifications pour vous assurer que ça fonctionne correctement :)
});