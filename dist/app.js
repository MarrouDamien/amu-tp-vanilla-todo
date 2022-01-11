/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadTodoItemFromApi\": () => (/* binding */ loadTodoItemFromApi),\n/* harmony export */   \"loadTodoItemsFromApi\": () => (/* binding */ loadTodoItemsFromApi),\n/* harmony export */   \"saveTodoItemToApi\": () => (/* binding */ saveTodoItemToApi)\n/* harmony export */ });\n// src/api.js\r\nconst SUPABASE_URL = \"https://pewrlzqojhfvwvsfluri.supabase.co/rest/v1/todos\";\r\nconst SUPABASE_API_KEY = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyMzYzMywiZXhwIjoxOTU3Mzk5NjMzfQ.EEGfZceJhWH6wCVD56c9IHiY_jeVb2tNNThCQiOjclI\";\r\n\r\n/**\r\n * Récupère une tâche sur Supabase grâce à son identifiant\r\n * @param {number} id \r\n * @returns Promise<{id: number, text: string, done: boolean}>\r\n */\r\n const loadTodoItemFromApi = (id) => {\r\n    return fetch(`${SUPABASE_URL}?id=eq.${id}`, {\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n            apiKey: SUPABASE_API_KEY,\r\n            Prefer: \"return=representation\",\r\n        },\r\n    })\r\n        .then((response) => response.json())\r\n        .then((items) => items[0]);\r\n};\r\n\r\nconst loadTodoItemsFromApi = () => {\r\n    return fetch(`${SUPABASE_URL}?order=created_at`, {\r\n      headers: {\r\n        apiKey: SUPABASE_API_KEY,\r\n      },\r\n    }).then((response) => response.json());\r\n  };\r\n\r\n  /**\r\n * Créé une nouvelle tâche dans Supabase\r\n * @returns Promise<{id: number, text: string, done: boolean}>\r\n */\r\nconst saveTodoItemToApi = (item) => {\r\n  return fetch(`${SUPABASE_URL}`, {\r\n    method: \"POST\",\r\n    body: JSON.stringify(item),\r\n    headers: {\r\n      \"Content-Type\": \"application/json\",\r\n      apiKey: SUPABASE_API_KEY,\r\n      Prefer: \"return=representation\",\r\n    },\r\n  }).then((response) => response.json());\r\n};\n\n//# sourceURL=webpack://amu-tp-vanilla-todo/./src/api.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _routing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routing.js */ \"./src/routing.js\");\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    (0,_routing_js__WEBPACK_IMPORTED_MODULE_0__.applyRouting)(window.location.pathname);\r\n});\n\n//# sourceURL=webpack://amu-tp-vanilla-todo/./src/app.js?");

/***/ }),

/***/ "./src/routing.js":
/*!************************!*\
  !*** ./src/routing.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyRouting\": () => (/* binding */ applyRouting)\n/* harmony export */ });\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\r\n\r\n/**\r\n * Appelle la fonction correspondante à une URL donnée\r\n * @param {string} url \r\n */\r\nconst applyRouting = (url) => {\r\n    let params;\r\n\r\n    // Si l'URL ressemble à /12/details\r\n    if (params = url.match(/^\\/(\\d+)\\/details$/)) {\r\n        // On cherche à afficher le détail d'une tâche\r\n        const id = +params[1];\r\n\r\n        console.log(\"J'affiche la tâche n°\" + id);\r\n        (0,_ui__WEBPACK_IMPORTED_MODULE_0__.displayTodoDetails)(id);\r\n        return;\r\n    }\r\n    // Dans tous les autres cas, on présente la liste des tâches\r\n    (0,_ui__WEBPACK_IMPORTED_MODULE_0__.displayTodoList)();\r\n}\r\nwindow.addEventListener('popstate', (e) => {\r\n    console.log(\"Changement d'URL\");\r\n    applyRouting(window.location.pathname);\r\n});\n\n//# sourceURL=webpack://amu-tp-vanilla-todo/./src/routing.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayTodoList\": () => (/* binding */ displayTodoList),\n/* harmony export */   \"displayTodoDetails\": () => (/* binding */ displayTodoDetails)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n\r\n\r\n// src/ui.js\r\n\r\n/**\r\n * Permet d'ajouter visuellement une tâche dans l'interface\r\n * @param {{id: number, text: string, done: boolean}} item\r\n */\r\nconst addTodo = (item) => {\r\n  const container = document.querySelector(\"ul\");\r\n  container.insertAdjacentHTML(\r\n    \"beforeend\",\r\n    `\r\n          <li>\r\n              <label>\r\n                  <input type=\"checkbox\" id=\"todo-${item.id}\" ${item.done ? \"checked\" : \"\"} /> \r\n                  ${item.text}\r\n              </label>\r\n             <a id=\"goto-${item.id}\" href=\"/${item.id}/details\">Détails</a>\r\n          </li>\r\n      `\r\n  );\r\n\r\n  document\r\n    .querySelector('a#goto-' + item.id)\r\n    .addEventListener('click', onClickLink);\r\n\r\n};\r\n\r\n/**\r\n * Permet d'ajouter visuellement la liste des tâches dans l'interface\r\n */\r\nconst displayTodoList = () => {\r\n  // Nous injectons nous même le code HTML de base de la liste des tâches désormais\r\n  // Ainsi que le formulaire, de telle sorte qu'on puisse afficher ces éléments via un simple appel de fonction\r\n  document.querySelector(\"main\").innerHTML = `\r\n          <h2>La liste des tâches</h2>\r\n          <ul></ul>\r\n          <form>\r\n            <input type=\"text\" name=\"todo-text\" placeholder=\"Ajouter une tâche\" />\r\n            <button>Ajouter</button>\r\n          </form>\r\n        `;\r\n\r\n  // Une fois le code HTML introduit dans l'interface, on peut afficher les tâches dans le <ul>\r\n  (0,_api__WEBPACK_IMPORTED_MODULE_0__.loadTodoItemsFromApi)().then((items) => {\r\n    items.forEach((item) => addTodo(item));\r\n  });\r\n\r\n  // Il faudra alors ajouter la gestion du submit du <form>\r\n  document.querySelector(\"form\").addEventListener(\"submit\", onSubmitForm);\r\n  \r\n};\r\n\r\n/**\r\n * Gestion du formulaire d'ajout d'une tâche\r\n * @param {Event} e\r\n */\r\nconst onSubmitForm = (e) => {\r\n  e.preventDefault();\r\n\r\n  // On récupère l' <input /> du formulaire\r\n  const input = document.querySelector('input[name=\"todo-text\"]');\r\n\r\n  // On créé une tâche avec la valeur de l'<input />\r\n  const item = {\r\n    text: input.value,\r\n    done: false,\r\n  };\r\n  \r\n  // On appelle l'API afin de sauver la nouvelle tâche\r\n  (0,_api__WEBPACK_IMPORTED_MODULE_0__.saveTodoItemToApi)(item).then((items) => {\r\n    // La réponse de l'API est un tableau avec les tâches\r\n    // touchées par le traitement, on prend la première (la seule en fait)\r\n    // Et on l'affiche dans l'interface\r\n    addTodo(items[0]);\r\n\r\n    // On vide l'<input /> et on remet le curseur dessus\r\n    input.value = \"\";\r\n    input.focus();\r\n  });\r\n\r\n};\r\n/**\r\n * Gestion du click sur une Checkbox\r\n * @param {MouseEvent} e\r\n */\r\nconst onClickCheckbox = (e) => {\r\n  // Code de gestion des checkbox ...\r\n};\r\n/**\r\n * Affiche dans l'interface le détails d'une tâche\r\n * @param {number} id \r\n */\r\nconst displayTodoDetails = (id) => {\r\n  // On appelle l'API afin de récupérer une tâche\r\n  (0,_api__WEBPACK_IMPORTED_MODULE_0__.loadTodoItemFromApi)(id).then((item) => {\r\n    // On injecte du HTML dans le <main> \r\n    // (supprimant donc ce qu'il contient à ce stade)\r\n    document.querySelector(\"main\").innerHTML = `\r\n                <h2>Détails de la tâche ${item.id}</h2>\r\n                <p><strong>Texte :</strong> ${item.text}</p>\r\n                <p><strong>Status : </strong> ${item.done ? \"Complété\" : \"A faire\"}</p>\r\n                <a id=\"back\" href=\"/\">Retour à la liste</a>\r\n            `;\r\n\r\n    // On n'oublie pas que le lien doit être géré par le routeur\r\n    document.querySelector('a#back')\r\n      .addEventListener('click', onClickLink);\r\n  });\r\n};\r\n/**\r\n* Gestion du click sur un lien\r\n* @param {MouseEvent} e \r\n*/\r\nconst onClickLink = (e) => {\r\n  // On empêche le comportement par défaut de l'événement\r\n  // qui reviendrait à réellement naviguer vers l'URL\r\n  e.preventDefault();\r\n\r\n  // On récupère l'URL du lien\r\n  const href = e.target.href;\r\n\r\n  // On ajoute à l'historique du navigateur ce lien (et par là même, on modifie l'URL dans la barre d'adresse)\r\n  window.history.pushState({}, '', href);\r\n\r\n  // On déclenche manuellement un événement popstate afin que le routeur soit conscient qu'il doit retravailler\r\n  window.dispatchEvent(new PopStateEvent('popstate'));\r\n}\n\n//# sourceURL=webpack://amu-tp-vanilla-todo/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;