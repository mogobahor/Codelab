import { Auth, Component, Module } from '@codelab/system';
import { bemClassName } from '@codelab/utils';

describe('Variant', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Registration', () => {
    it('opens the register modal with the register link', () => {
      const linkClass = bemClassName(
        Component.Link,
        Module.Auth,
        Auth.Register,
      );
      const modalClass = bemClassName(
        Component.Modal,
        Module.Auth,
        Auth.Register,
      );

      cy.get(linkClass).click();

      // Modal dialog should be visible
      cy.get(modalClass)
        .closest('.ant-modal-wrap')
        .should('be.visible');
    });

    // it('fills the username & password', () => {});

    // it('has a resend code link', () => {
    //   cy.get('.Modal-auth--register')
    //     .contains('Resend Verification Code')
    //     .should('have.length', 1);
    // });
    //
    // it('has a sign in link', () => {
    //   cy.get('.Modal-auth--register')
    //     .contains('Sign in')
    //     .should('have.length', 1);
    // });

    // it('fills in the email & password', () => {
    //   cy.get('form.Form-auth--register input[name=username]').type('r');
    //   cy.get('form.Form-auth--register input[name=email]').type(
    //     'rsdntevl@gmail.com'
    //   );
    //   cy.get('form.Form-auth--register
    // input[name=password]').type('Hello123');
    // cy.get('form.Form-auth--register button[type=submit]').click(); });
  });

  // describe('Login', () => {
  //   it('has a login link in the nav', () => {
  //     cy.get('.ant-layout-header')
  //       .contains('Login')
  //       .should('have.length', 1);
  //   });
  // });
});
