function ProductGallerySkeleton() {
  return (
    <div className="xl:col-span-6 col-span-full">
      <div className="w-full aspect-square bg-gray-200 animate-pulse rounded"></div>
      <div className="flex gap-2 mt-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-1/5 aspect-square bg-gray-200 animate-pulse rounded"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallerySkeleton;
