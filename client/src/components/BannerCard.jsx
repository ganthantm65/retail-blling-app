import React from 'react'

const BannerCard = ({ imageUrl, categoryName }, index) => {    
  return (
    <div
      key={index}
      className="w-290 h-200 bg-gradient-to-r from-cyan-500 to-violet-700 rounded-lg shadow-lg flex flex-column items-center justify-around text-white font-semibold text-xl p-4"
    >
      <img src={imageUrl} alt={categoryName} className="w-54 h-54 object-contain rounded-lg" />
      <div className="w-150 h-full flex flex-col items-start justify-evenly gap-2">
        <h1 className="text-2xl font-bold text-white">{categoryName}</h1>
      </div>
    </div>
  );
};

export default BannerCard;
