import React from 'react';

const Social = ({socialIcon}) => {
  return (
    <div className="md:w-12 md:h-12 md:mr-4 rounded-full bg-blue-night border border-violet-secondary flex-center">
      {socialIcon}
    </div>
  );
};

export default Social;
