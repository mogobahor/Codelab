import { Form } from '@codelab/form';
import React from 'react';
import withPageProps from 'src/hoc/withPageProps';

const ON_SUBMIT = input => {
  console.log(input);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('good');
    }, 1200);
  });
};

const ON_COMPLETE = () => {
  console.log('complete');
};

const fields = [
  {
    name: 'name',
    inputType: 'text',
    value: '',
    type: 'string',
    validation: [
      { required: true, msg: 'Required!!' },
      { min: 2, msg: 'Too Short!' },
      { max: 10, msg: 'Too Long!' },
    ],
  },
];

const Home = props => {
  return (
    <section>
      <Form onSubmit={ON_SUBMIT} onComplete={ON_COMPLETE} />
    </section>
  );
};

export default withPageProps()(Home);
