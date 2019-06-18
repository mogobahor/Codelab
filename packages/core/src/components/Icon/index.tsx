import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as svgIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as _ from 'lodash';

_.each(svgIcons[svgIcons.prefix], svgIcon => {
  // console.log(svgIcon)
  library.add(svgIcon);
});

const Icon = ({ icon }) => {
  return <FontAwesomeIcon icon={icon} />;
};

export default Icon;
