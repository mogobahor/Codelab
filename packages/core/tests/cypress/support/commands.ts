import stubRoute from './stubRoute';
import visitStubbed from './visitStubbed';

Cypress.Commands.add('visitStubbed', visitStubbed);
Cypress.Commands.add('stubRoute', stubRoute);
