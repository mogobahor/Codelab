import React from 'react';
import AddAction from 'src/components/Workflow/Popover-action';
import AddEvent from 'src/components/Workflow/Popover-event';
import AddWorkflow from 'src/components/Workflow/Popover-workflow';

const TabWorkflow = () => {
  return (
    <>
      <AddWorkflow />
      <AddEvent />
      <AddAction />
    </>
  );
};

export default TabWorkflow;
