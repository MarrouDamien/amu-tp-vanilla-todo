import { loadTodoItemsFromApi, loadTodoItemFromApi, saveTodoItemToApi } from "./api";

// src/ui.js

/**
 * Permet d'ajouter visuellement une tâche dans l'interface
 * @param {{id: number, text: string, done: boolean}} item
 */
const addTodo = (item) => {
  const container = document.querySelector("ul");
  container.insertAdjacentHTML(
    "beforeend",
    `
          <li>
              <label>
                  <input type="checkbox" id="todo-${item.id}" ${item.done ? "checked" : ""} /> 
                  ${item.text}
              </label>
             <a id="goto-${item.id}" href="/${item.id}/details">Détails</a>
          </li>
      `
  );

  document
    .querySelector('a#goto-' + item.id)
    .addEventListener('click', onClickLink);

};

/**
 * Permet d'ajouter visuellement la liste des tâches dans l'interface
 */
export const displayTodoList = () => {
  // Nous injectons nous même le code HTML de base de la liste des tâches désormais
  // Ainsi que le formulaire, de telle sorte qu'on puisse afficher ces éléments via un simple appel de fonction
  document.querySelector("main").innerHTML = `
          <h2>La liste des tâches</h2>
          <ul></ul>
          <form>
            <input type="text" name="todo-text" placeholder="Ajouter une tâche" />
            <button>Ajouter</button>
          </form>
        `;

  // Une fois le code HTML introduit dans l'interface, on peut afficher les tâches dans le <ul>
  loadTodoItemsFromApi().then((items) => {
    items.forEach((item) => addTodo(item));
  });

  // Il faudra alors ajouter la gestion du submit du <form>
  document.querySelector("form").addEventListener("submit", onSubmitForm);
  
};

/**
 * Gestion du formulaire d'ajout d'une tâche
 * @param {Event} e
 */
const onSubmitForm = (e) => {
  e.preventDefault();

  // On récupère l' <input /> du formulaire
  const input = document.querySelector('input[name="todo-text"]');

  // On créé une tâche avec la valeur de l'<input />
  const item = {
    text: input.value,
    done: false,
  };
  
  // On appelle l'API afin de sauver la nouvelle tâche
  saveTodoItemToApi(item).then((items) => {
    // La réponse de l'API est un tableau avec les tâches
    // touchées par le traitement, on prend la première (la seule en fait)
    // Et on l'affiche dans l'interface
    addTodo(items[0]);

    // On vide l'<input /> et on remet le curseur dessus
    input.value = "";
    input.focus();
  });

};
/**
 * Gestion du click sur une Checkbox
 * @param {MouseEvent} e
 */
const onClickCheckbox = (e) => {
  // Code de gestion des checkbox ...
};
/**
 * Affiche dans l'interface le détails d'une tâche
 * @param {number} id 
 */
export const displayTodoDetails = (id) => {
  // On appelle l'API afin de récupérer une tâche
  loadTodoItemFromApi(id).then((item) => {
    // On injecte du HTML dans le <main> 
    // (supprimant donc ce qu'il contient à ce stade)
    document.querySelector("main").innerHTML = `
                <h2>Détails de la tâche ${item.id}</h2>
                <p><strong>Texte :</strong> ${item.text}</p>
                <p><strong>Status : </strong> ${item.done ? "Complété" : "A faire"}</p>
                <a id="back" href="/">Retour à la liste</a>
            `;

    // On n'oublie pas que le lien doit être géré par le routeur
    document.querySelector('a#back')
      .addEventListener('click', onClickLink);
  });
};
/**
* Gestion du click sur un lien
* @param {MouseEvent} e 
*/
const onClickLink = (e) => {
  // On empêche le comportement par défaut de l'événement
  // qui reviendrait à réellement naviguer vers l'URL
  e.preventDefault();

  // On récupère l'URL du lien
  const href = e.target.href;

  // On ajoute à l'historique du navigateur ce lien (et par là même, on modifie l'URL dans la barre d'adresse)
  window.history.pushState({}, '', href);

  // On déclenche manuellement un événement popstate afin que le routeur soit conscient qu'il doit retravailler
  window.dispatchEvent(new PopStateEvent('popstate'));
}