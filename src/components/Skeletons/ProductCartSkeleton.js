export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-md p-4 shadow-lg mx-2">
      <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
      <div className="h-4 bg-gray-300 rounded mt-6 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mt-3 w-1/2"></div>
      <div className="h-3 bg-gray-300 rounded mt-4 w-1/4"></div>
      <div className="h-6 bg-gray-300 rounded mt-4 w-1/3"></div>
    </div>
  );
}
