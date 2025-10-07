export const Card = ({ className, children }) => <div className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}>{children}</div>;
export const CardHeader = ({ className, children }) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
export const CardTitle = ({ className, children }) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
export const CardDescription = ({ className, children }) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
export const CardContent = ({ className, children }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

export const Input = ({ className, ...props }) => <input className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${className}`} {...props} />;
export const Label = ({ className, ...props }) => <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props} />;
export const Badge = ({ className, children }) => <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>{children}</span>;
