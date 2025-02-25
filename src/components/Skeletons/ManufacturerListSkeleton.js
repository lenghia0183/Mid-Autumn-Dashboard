import clsx from "clsx";

const ManufacturerListSkeleton = ({ className, count = 5 }) =>
  Array.from({ length: count }).map((_, index) => {
    const randomWidth = `${Math.floor(10 + Math.random() * 50)}%`;

    return (
      <div
        key={index}
        className={clsx("mt-2 flex gap-x-3 items-center", className)}
      >
        <div className="animate-pulse bg-gray-300 rounded w-[25px] h-[25px]"></div>
        <div
          className="animate-pulse bg-gray-300 rounded h-[20px]"
          style={{ width: randomWidth }}
        ></div>
      </div>
    );
  });

export default ManufacturerListSkeleton;
