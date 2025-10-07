import logo from "../../assets/Images/greenplore.png"
import { Button } from "./Button";
import { Users,Truck,Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-sm mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img 
                         onClick={()=>{navigate("/123e4567-e89b-12d3-a456-426614174000")}}
                        className="cursor-pointer h-10 w-28 md:h-15 md:w-44"   src={logo} alt="GreenPlore" width={50} height={50}  />
                    </div>
                  
<div className="flex items-center gap-2 md:gap-4">
    {/* All Sellers Button */}
    <Button
        onClick={()=>{navigate("/f81d4fae-7dec-11d0-a765-00a0c91e6bf6")}}
        variant="outline"
        className="p-2 text-green-700 hover:bg-green-50 md:px-4 md:py-2 cursor-pointer "
        title="All Sellers"
    >
        <Store className="h-5 w-5" />
        <span className="hidden md:inline md:ml-2 text-xs font-semibold">
            All Sellers
        </span>
    </Button>

    {/* All Customers Button */}
    <Button
        onClick={()=>{navigate("/988c5a5c-6b39-4675-9a84-08a38343353b")}}
        variant="outline"
        className="p-2 text-green-700 hover:bg-green-50 md:px-4 md:py-2 cursor-pointer"
        title="All Customers"
    >
        <Users className="h-5 w-5" />
        <span className="hidden md:inline md:ml-2 text-xs font-semibold">
            All Customers
        </span>
    </Button>

    {/* All Orders Button */}
    <Button
        onClick={()=>{navigate("/c6a4a1a0-3818-4055-9a99-4a46a5f7f8a8")}}
        className="p-2 bg-green-600 text-white shadow-md hover:bg-green-700 md:px-4 md:py-2 cursor-pointer"
        title="All Orders"
    >
        <Truck className="h-5 w-5" />
        <span className="hidden md:inline md:ml-2 text-xs font-semibold">
            All Orders
        </span>
    </Button>
</div>

                </div>
            </div>
        </nav>
    );
};