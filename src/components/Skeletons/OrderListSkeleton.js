import clsx from "clsx";

const OrderListSkeleton = ({ count = 3, className }) => {
  return (
    <div className={clsx("flex flex-col gap-y-7", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-5 shadow-md bg-gray-100 animate-pulse">
          <div className="flex justify-between">
            <div className="h-5 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="h-5 bg-gray-300 rounded w-[10%] mb-3"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded w-1/5 mb-3"></div>
          <div className="h-5 bg-gray-300 rounded w-1/5 mb-3"></div>
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
          <div className="mt-5 space-y-2">
            <div className="h-7 bg-gray-300 rounded w-1/5 m-auto"></div>
            <div className="h-20 bg-gray-300 rounded w-full mt-3"></div>
            <div className="h-20 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListSkeleton;
