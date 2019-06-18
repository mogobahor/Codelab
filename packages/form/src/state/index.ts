import { merge } from 'lodash';
import formState, { formTypeDef } from 'src/state/formState';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-boost';

const cache = new InMemoryCache();

const mergedState = merge(formState);

const typeDefs = [formTypeDef];
const stateLink = withClientState({
  cache,
  ...mergedState,
  typeDefs,
});

export default stateLink;
