import { MailIcon,PhoneIcon } from 'lucide-react'

export const CustomerCard = ({ customer }) => {
  // Helper function to generate initials for the avatar
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0] : '';
    const lastInitial = lastName ? lastName[0] : '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden">
      {/* Card Header with Avatar and Name */}
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {getInitials(customer.firstName, customer.lastName)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {customer.firstName} {customer.lastName}
          </h3>
          <p className="text-sm text-gray-500">Customer</p>
        </div>
      </div>
      
      {/* Card Body with Contact Details */}
      <div className="p-5 flex-grow space-y-4">
        <div className="flex items-center text-gray-600">
          <MailIcon className="w-5 h-5 mr-3 text-gray-400" />
          <a href={`mailto:${customer.email}`} className="truncate hover:text-blue-600 transition-colors">
            {customer.email}
          </a>
        </div>
        <div className="flex items-center text-gray-600">
          <PhoneIcon className="w-5 h-5 mr-3 text-gray-400" />
          <a href={`tel:${customer.mobile}`} className="hover:text-blue-600 transition-colors">
            {customer.mobile}
          </a>
        </div>
      </div>
      
      {/* Card Footer with Joined Date */}
      <div className="bg-gray-50 px-5 py-3 text-right">
        <p className="text-xs text-gray-500">
          Joined on: {formatDate(customer.createdAt)}
        </p>
      </div>
    </div>
  );
};
