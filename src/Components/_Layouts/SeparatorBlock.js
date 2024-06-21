import React from 'react';
import SeparatorLeft from './SeparatorLeft';
import SeparatorRight from './SeparatorRight';
import '../../Styles/SeparatorBlock.css';

const SeparatorBlock = ({ title }) => {
  return (
    <div className="separator-block">
      <SeparatorLeft />
      <div className="separator-title">{title}</div>
      <SeparatorRight />
    </div>
  );
};

export default SeparatorBlock;
