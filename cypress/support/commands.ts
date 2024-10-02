// <reference types="cypress" />
Cypress.Commands.add('login', (email, password) => { 

 })

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}

export {};