
declare namespace Cypress {
    interface Chainable {
        navigateTo(url: string): typeof Window;
        axe();
    }
}
