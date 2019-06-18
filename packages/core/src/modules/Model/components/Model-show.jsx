import React from 'react';

const ModelShow = (props) => {
  console.log(props);
  return (
    <div>
      Model:
      <p>{props.model.name}</p>
      <p>{props.model.id}</p>
    </div>
  );
};

export default ModelShow;
