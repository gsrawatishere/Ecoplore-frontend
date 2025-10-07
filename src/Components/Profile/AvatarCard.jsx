const AvatarCard = ({ firstName, lastName, mobile, email, createdAt }) => {
  // Calculate initials from firstName and lastName
  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`;

  return (
    <div className="relative bg-white rounded-lg  w-full   p-4 pt-28  "> {/* increased pt-16 to pt-28 */}
      
      {/* Avatar Circle at Top Center */}
      <div className="absolute -top-0 mt-2 left-1/2 transform -translate-x-1/2"> {/* Adjusted to -top-12 for perfect alignment */}
        <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl font-semibold shadow-md">
          {initials.toUpperCase()}
        </div>
      </div>
  
      {/* Content Below Avatar */}
      
        <div className="flex flex-col items-center justify-center gap-0.5">
          <h2 className="text-lg font-bold">{firstName} {lastName}</h2>
          <p className="text-gray-700 text-md">Email : {email}</p>
          <p className="text-md text-gray-700">Mobile No : {mobile}</p>
          <p className="text-sm text-slate-500">Created on: {createdAt}</p>
        </div>
  
  
      {/* Bottom Right: Date of Creation
      <div className="absolute bottom-2 right-4">
        <p className="text-xs text-slate-400">Created on: {createdAt}</p>
      </div> */}
    </div>
  );
};

export default AvatarCard;