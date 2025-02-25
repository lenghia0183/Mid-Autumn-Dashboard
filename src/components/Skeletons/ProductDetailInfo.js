function ProductDetailInfoSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[45px] w-3/4 bg-gray-200 rounded"></div>

      <div className="mt-3 h-6 w-1/3 bg-gray-200 rounded"></div>

      <div className="sm:flex gap-2 text-xl font-medium xl:mt-3 mt-3">
        <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
        <p className="sm:inline-block hidden">|</p>
        <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-3 h-8 w-1/4 bg-gray-300 rounded"></div>

      <div className="mt-3 h-20 w-full bg-gray-200 rounded"></div>

      <div className="flex flex-col sm:flex-row gap-5 mt-5">
        <div className="sm:w-[30%] w-[70%] h-12 bg-gray-200 rounded"></div>
        <div className="flex gap-3">
          <div className="h-12 w-32 bg-gray-200 rounded"></div>
          <div className="h-12 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="sm:mt-5 mt-3 h-14 w-48 bg-gray-300 rounded"></div>

      <div className="shadow-sm sm:mt-5 mt-3 flex items-center gap-4 py-2 px-3">
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
        <div className="flex sm:flex-row flex-col flex-wrap sm:gap-4 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-6 w-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailInfoSkeleton;
