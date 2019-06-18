import React from 'react';
import {
  OperationVariables,
  Query as ApolloQuery,
  QueryProps,
} from 'react-apollo';
import { App } from 'src/components/App/App';
import { Class, CSSTemplate } from 'src/components/Builder';
import { Action, IAction } from 'src/components/Builder/Action';
import { Event, IEvent } from 'src/components/Builder/Event';
import { Model } from 'src/components/Builder/interfaces';
import { IWorkflow, Workflow } from 'src/components/Builder/Workflow';
import { WorkflowTemplate } from 'src/components/Builder/WorkflowTemplate';
import Component from 'src/components/Component/Component';
import Element from 'src/components/Element/Element';
import { User } from 'src/components/User/User';
import { ModelList, Models } from 'src/graphql/modelTypes';

/**
 * Add extra props to Apollo Query
 */
type MyQueryProps<T> = {
  useLoader?: boolean;
};

/**
 * Use displayName for type
 */
class Query<
  TData = any,
  TVariables = OperationVariables
> extends React.Component<QueryProps<TData> & MyQueryProps<TData>, TVariables> {
  render() {
    const { query, variables, displayName, useLoader = false } = this.props;

    return (
      <ApolloQuery query={query} variables={variables}>
        {results => {
          const { data, loading, error } = results;
          if (loading) return useLoader ? 'Loading...' : null;
          if (error) return `Error! ${error.message}`;

          // Use factory to build up results
          switch (displayName) {
            case Models.User:
              results.data = { user: new User(data.user) };
              break;

            case Models.App:
              results.data = { app: new App(data.app) };
              break;

            case Models.Component:
              const component = new Component(data.component);
              results.data = { component };
              break;

            case Models.Element:
              // TODO: Why does it fire when opening selectVariant popover
              const elements = data.elements
                ? data.elements.map(element => new Element(element))
                : [];
              results.data = {
                elements,
              };
              break;

            case Models.WorkflowTemplate:
              results.data = {
                workflowTemplate: new WorkflowTemplate(data),
              };
              break;

            case ModelList.Components:
              const components = Component.mapComponents(data.components);
              results.data = { components };
              break;

            case ModelList.CSSTemplates:
              const cssTemplates = CSSTemplate.mapCssTemplates(
                data.cssTemplates,
              );
              results.data = { cssTemplates };
              break;

            case Models.Event:
              const events: Model<IEvent>[] = Event.mapEvents(data.events);
              results.data = {
                events,
              };
              break;

            case Models.Workflow:
              const workflows: Model<IWorkflow>[] = Workflow.mapWorkflows(
                data.workflows,
              );
              results.data = {
                workflows,
              };
              break;

            case ModelList.CSSClasses:
              const cssClasses = Class.mapClasses(data.cssClasses);
              results.data = { cssClasses };
              break;

            case Models.Action:
              const actions: Model<IAction>[] = Action.mapActions(data.actions);
              results.data = {
                actions,
              };
              break;

            default:
              break;
          }

          return <>{this.props.children(results)}</>;
        }}
      </ApolloQuery>
    );
  }
}

export default Query;
