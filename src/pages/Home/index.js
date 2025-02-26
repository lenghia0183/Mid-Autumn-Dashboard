import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const Home = () => {
  // Danh sách sản phẩm ban đầu với fake data
  const [products, setProducts] = useState([
    { id: 1, name: "Sản phẩm A", price: 100000 },
    { id: 2, name: "Sản phẩm B", price: 200000 },
    { id: 3, name: "Sản phẩm C", price: 300000 },
    // ... có thể bổ sung thêm sản phẩm để kiểm tra phân trang
  ]);

  // State để quản lý từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // State cho số dòng mỗi trang và trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Thêm sản phẩm mới
  const handleAdd = () => {
    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = {
      id: newId,
      name: `Sản phẩm ${newId}`,
      price: 100000 * newId,
    };
    setProducts([...products, newProduct]);
  };

  // Sửa sản phẩm (giả lập qua prompt)
  const handleEdit = (id) => {
    const newName = prompt("Nhập tên sản phẩm mới:");
    const newPrice = prompt("Nhập giá sản phẩm mới:");
    if (newName && newPrice) {
      setProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, name: newName, price: parseFloat(newPrice) }
            : product
        )
      );
    }
  };

  // Xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Lọc sản phẩm theo từ khóa (không phân biệt chữ hoa, chữ thường)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán phân trang
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Chuẩn bị dữ liệu cho component Table
  // Thêm cột "STT" (số thứ tự), sau đó là "ID", "Tên sản phẩm", "Giá", "Hành động"
  const headers = ["STT", "ID", "Tên sản phẩm", "Giá", "Hành động"];
  const rows = displayedProducts.map((product, index) => [
    startIndex + index + 1,
    product.id,
    product.name,
    product.price.toLocaleString() + " đ",
    <div className="flex justify-center gap-2">
      <button
        onClick={() => handleEdit(product.id)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
      >
        Sửa
      </button>
      <button
        onClick={() => handleDelete(product.id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200"
      >
        Xóa
      </button>
    </div>,
  ]);

  // Xử lý thay đổi số dòng mỗi trang
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Xử lý thay đổi trang từ component Pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="pl-5 pt-5 h-screen">
      <div className="p-5 shadow-xl h-auto">
        <h2 className="text-[28px] font-medium mb-4">Danh sách sản phẩm</h2>

        {/* Thanh tìm kiếm sử dụng Formik */}
        <Formik initialValues={{ keyword: "" }} onSubmit={() => {}}>
          {({ handleChange }) => (
            <Form>
              <FormikTextField
                name="keyword"
                label="Tìm kiếm sản phẩm"
                className="mt-7"
                onChange={(e) => {
                  handleChange(e);
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </Form>
          )}
        </Formik>

        <Button onClick={handleAdd} className="my-5">
          Thêm sản phẩm
        </Button>

        {/* Component Table tái sử dụng */}
        <Table headers={headers} rows={rows} />

        <Pagination
          pageCount={10}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          className="ml-auto mt-10"
        />
      </div>
    </main>
  );
};

export default Home;
