// tests/routing.test.js

import { applyRouting } from "../src/routing";
import { displayTodoDetails, displayTodoList } from "../src/ui";

// Nous ne voulons pas que les fonctions qui se trouvent dans le module src/ui.js soient
// réellement appelées, nous souhaitons les mocker et les contrôler nous même.
jest.mock("../src/ui");

// Testons que l'URL "/" appellera bien le comportement adéquat
it("should display todo list", async () => {
    // On appelle applyRouting avec l'URL "/"
    applyRouting("/");

    // On s'attend à ce que la fonction displayTodoList ait été appelée
    expect(displayTodoList).toBeCalled();
});

// Testons que ces différentes URL afficheront bien le contenu adéquat
it("should display details", () => {
    // Si on appelle 3 fois notre routeur avec 3 URLs différentes
    // mais correspondantes à la page de détails d'une tâche
    applyRouting("/1/details");
    applyRouting("/12/details");
    applyRouting("/440/details");

    // On s'attend à ce que chaque appel ait déclenché la fonction displayTodoDetails !
    expect(displayTodoDetails).toBeCalledTimes(3);
});