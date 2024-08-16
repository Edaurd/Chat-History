import React, { useState } from 'react';

interface AvatarImageProps {
  figure: string;
  type?: number;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ figure, type }) => {

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'src/assets/images/noob.png';
      };
    
      const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.classList.add('loaded');
      };

      return (
        <>
          <div className="avatar-container">
            {type == 4 || type == 5 ? (
              <img
                src={type == 4 ? `src/assets/images/added.png` : `src/assets/images/removed.png`}
                height={27}
                className="status-image"
                alt="joinleft"
              />
            ) : (
              ""
            )}
            <img
              src={`https://sandbox.habbo.com/habbo-imaging/avatarimage?headonly=1&size=s&figure=${figure}`}
              height={27}
              className="avatar-image"
              alt="avatar"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </div>
        </>
      );
};

export default AvatarImage;
