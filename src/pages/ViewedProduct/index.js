import images from "../../asset/images";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import { useState } from "react";

function ViewedProduct() {
  const [currentPage, setCurrentPage] = useState(0);
  const items = [
    {
      id: 1,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1300000,
      image: images.popularDish1,
      rating: 2.5,
      alt: "Banner 1",
      state: 0,
      brand: "Kinh đô",
      discount: 10,
    },
    {
      id: 2,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1500000,
      image: images.popularDish2,
      rating: 5,
      alt: "Banner 2",
      state: 1,
      brand: "Huỳnh đô",
      discount: 15,
    },
    {
      id: 3,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1200000,
      image: images.popularDish3,
      rating: 4,
      alt: "Banner 3",
      state: 0,
      brand: "Sao vàng",
      discount: 20,
    },
    {
      id: 4,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1400000,
      image: images.popularDish1,
      rating: 5,
      alt: "Banner 4",
      state: 1,
      brand: "Thủ đô",
      discount: 5,
    },
    {
      id: 5,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1100000,
      image: images.popularDish3,
      rating: 3,
      alt: "Banner 5",
      state: 0,
      brand: "Sao vàng",
      discount: 25,
    },
    {
      id: 6,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1600000,
      image: images.popularDish2,
      rating: 4.5,
      alt: "Banner 6",
      state: 1,
      brand: "Thủ đô",
      discount: 0,
    },
  ];

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        Danh sách sản phẩm đã xem
      </h2>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {items.map((item) => (
          <ItemCard key={item.id} product={item} />
        ))}
      </div>

      <Pagination
        pageCount={20}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        className="ml-auto mt-10"
      />
    </div>
  );
}

export default ViewedProduct;
