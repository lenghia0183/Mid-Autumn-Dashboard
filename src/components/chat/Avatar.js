import React from "react";
import Icon from "../Icon";
import Image from "../Image";

/**
 * Avatar component for chat users
 * @param {object} props - Component props
 * @param {string} props.image - Image URL
 * @returns {JSX.Element} Avatar component
 */
const Avatar = ({ image }) => (
  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white mt-1 mx-2">
    {image ? (
      <Image
        src={image}
        width="w-full"
        height="h-full"
        className="object-cover"
      />
    ) : (
      <div className="bg-emerald flex items-center justify-center w-full h-full">
        <Icon name="user" color="white" size="1.2" />
      </div>
    )}
  </div>
);

export default Avatar;
