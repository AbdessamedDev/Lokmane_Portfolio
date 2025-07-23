import React from 'react';

const ContactInfo = ({infoIcon, infoTitle, infoContent}) => {
  return (
    <div className="md:w-[552px] md:h-[78px] bg-blue-night rounded-lg border-[1.5px] border-violet-secondary md:px-4 md:py-[15.5px] flex items-center justify-start gap-3 md:mb-6">
      <div className="text-violet-primary size-6">
        {infoIcon}
      </div>
      <div>
        <h3 className="font-fsp-bold font-normal text-[#464B60] text-xs md:mb-2">{infoTitle}</h3>
        <span className="block md:text-sm text-white font-fsp-bold font-normal">{infoContent}</span>
      </div>
    </div>
  );
};

export default ContactInfo;
