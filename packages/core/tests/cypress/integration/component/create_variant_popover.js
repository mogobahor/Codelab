describe('Authentication', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Registration', () => {
    it('opens the "Select a Variant" popover for a Button Component', () => {
      cy.get('.Link-auth--register').click();
      cy.get('.Modal-auth--register')
        .contains('Register')
        .should('have.length', 1);
    });

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
