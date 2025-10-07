import { Mail, Phone, MapPin, Landmark, FileText,ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const DetailItem = ({ icon, label, value, children }) => (
  <div>
    <h4 className="text-xs font-semibold text-gray-500 flex items-center mb-1">
      {icon}
      <span className="ml-2">{label}</span>
    </h4>
    {value ? <p className="text-sm text-gray-800 break-words">{value}</p> : children}
  </div>
);


export const SellerCard = ({ seller }) => {
  const navigate = useNavigate();

  // Helper function to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Card Header */}
      <div className="p-4 md:p-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-green-800">{seller.companyName}</h3>
          <p className="text-xs text-gray-500 mt-1">
            Joined on: {formatDate(seller.createdAt)}
          </p>
        </div>

        {/* View Orders Button */}
        <button
         onClick={()=>{navigate(`/admin-seller-orders/${seller.email}`)}}
            className="flex items-center justify-center p-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all md:px-3"
            title="View Orders"
        >
            <ShoppingBag className="h-4 w-4" />
            <span
            
            className="hidden md:inline text-xs font-semibold ml-2">
                View Orders
            </span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        
        {/* Column 1: Contact & Legal */}
        <div className="space-y-5">
          <DetailItem icon={<Mail size={14} />} label="Email Address" value={seller.email} />
          <DetailItem icon={<Phone size={14} />} label="Mobile Number" value={seller.mobile} />
          <DetailItem icon={<FileText size={14} />} label="GST Number" value={seller.gst} />
        </div>

        {/* Column 2: Address & Bank */}
        <div className="space-y-5">
          <DetailItem icon={<MapPin size={14} />} label="Registered Address">
            <p className="text-sm text-gray-800">
              {seller.address.buildingNo}, {seller.address.street},<br/>
              {seller.address.landmark ? `${seller.address.landmark}, ` : ''}<br/>
              {seller.address.city}, {seller.address.state} - {seller.address.pinCode}
            </p>
          </DetailItem>

          <DetailItem icon={<Landmark size={14} />} label="Bank Account Details">
             <p className="text-sm text-gray-800 font-mono">
              <span className="font-semibold">{seller.bankDetails.fullName}</span><br/>
              A/C: {seller.bankDetails.accountNo}<br/>
              IFSC: {seller.bankDetails.ifsccode}
            </p>
          </DetailItem>
        </div>
      </div>
    </div>
  );
}; 