import React from 'react';
import Form from 'src/components/Form/Form';
const MixedInputs = ({ fields, CREATE_MODEL, ON_COMPLETE }) => {
  return (
    <Form fields={fields} onSubmit={CREATE_MODEL} onComplete={ON_COMPLETE} />
  );
};

export default MixedInputs;
