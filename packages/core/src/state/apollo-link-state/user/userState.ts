import gql from 'graphql-tag';
import { filter } from 'lodash';
import uuidv1 from 'uuid/v1';

// console.log('check the re-build', getUser);

const TYPENAME_APP = 'App';
const TYPENAME_PAGE = 'Page';

export const usrDef = `
  type Page {
    id: String
    title: String
  }

  type App {
    id: String
    name: String
    pages: [Page]
  }

  type User {
    id: String
    username: String
    authenticated
    apps: [App]
  }

  type Query {
    user: User
  }
`;

// ${userAppQuery}

export const GET_USER = gql`
  query getUser {
    user @client {
      username
      authenticated
    }
  }
`;

export const QUERY_GET_USER_APPS = gql`
  query getUser {
    user @client {
      apps {
        id
        name
        pages {
          id
          title
        }
      }
    }
  }
`;

const FRAGMENT_PAGES = gql`
  fragment pagesFragment on ${TYPENAME_APP} {
    name
    pages {
      id
      title
    }
  }
`;

const userState = {
  defaults: {
    user: {
      __typename: 'user.ts',
      username: null,
      authenticated: false,
      apps: [
        {
          id: '1',
          name: 'Default App',
          __typename: TYPENAME_APP,
          pages: [
            {
              id: '1',
              title: 'Default Page',
              __typename: TYPENAME_PAGE,
            },
          ],
        },
      ],
    },
  },
  resolvers: {
    Query: {
      authenticated: (_, variables, { cache }) => {
        const {
          user: { authenticated },
        } = cache.readQuery({ query: GET_USER });
        return authenticated;
      },
    },
    Mutation: {
      setUser: (_, { username }, { cache }) => {
        const data = {
          user: {
            username,
            __typename: 'user.ts',
            // authenticated: username !== null,
          },
        };
        cache.writeData({ data });
        return cache.readQuery({ query: GET_USER });
      },
      createUsrApp: (_, { app }, { cache }) => {
        const { user } = cache.readQuery({ query: QUERY_GET_USER_APPS });
        const { apps } = user;

        user.apps = apps.concat([
          {
            ...app,
            id: uuidv1(),
            pages: [],
            __typename: TYPENAME_APP,
          },
        ]);

        cache.writeQuery({
          query: QUERY_GET_USER_APPS,
          data: {
            user,
          },
        });
        return user.apps;
      },
      updateUsrApp: (_, { app, appID }, { cache }) => {
        const id = `${TYPENAME_APP}:${appID}`;
        const oldApp = cache.readFragment({ id, fragment: FRAGMENT_PAGES });
        if (!app) return;
        cache.writeFragment({
          id,
          fragment: FRAGMENT_PAGES,
          data: {
            ...oldApp,
            ...app,
          },
        });
        return app.pages;
      },
      deleteUsrApp: (_, { appID }, { cache }) => {
        const { user } = cache.readQuery({ query: QUERY_GET_USER_APPS });
        const { apps } = user;
        user.apps = filter(apps, app => app.id !== appID);
        cache.writeQuery({
          query: QUERY_GET_USER_APPS,
          data: {
            user,
          },
        });
        return user.apps;
      },
      createAppPage: (_, { page, appID }, { cache }) => {
        const id = `${TYPENAME_APP}:${appID}`;

        const app = cache.readFragment({ id, fragment: FRAGMENT_PAGES });
        if (!app) return;
        const newPage = {
          id: uuidv1(),
          ...page,
          __typename: TYPENAME_PAGE,
        };
        const pages = app.pages || [];
        cache.writeFragment({
          id,
          fragment: FRAGMENT_PAGES,
          data: {
            ...app,
            pages: pages.concat([newPage]),
          },
        });
        return app.pages;
      },
      updateAppPage: (_, { page, pageID }, { cache }) => {
        const id = `${TYPENAME_PAGE}:${pageID}`;
        const fragment = gql`
          fragment PageSettingFragment on ${TYPENAME_PAGE} {
            title
          }
        `;
        const oldPage = cache.readFragment({ fragment, id });

        if (!oldPage) return;
        cache.writeFragment({
          id,
          fragment,
          data: {
            ...oldPage,
            ...page,
          },
        });
        return page;
      },
      deleteAppPage: (_, { appID, pageID }, { cache }) => {
        const id = `${TYPENAME_APP}:${appID}`;

        const app = cache.readFragment({ id, fragment: FRAGMENT_PAGES });
        if (!app) return;

        cache.writeFragment({
          id,
          fragment: FRAGMENT_PAGES,
          data: {
            ...app,
            pages: filter(app.pages, page => page.id !== pageID),
          },
        });
        return app.pages;
      },
    },
  },
};

export default userState;
