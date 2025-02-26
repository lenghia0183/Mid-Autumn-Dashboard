import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import Button from "../../components/Button";
import Pagination from "./../../components/Pagination/index";

const Home = () => {
  // Danh sách sản phẩm ban đầu với fake data
  const [products, setProducts] = useState([
    { id: 1, name: "Sản phẩm A", price: 100000 },
    { id: 2, name: "Sản phẩm B", price: 200000 },
    { id: 3, name: "Sản phẩm C", price: 300000 },
  ]);

  // State để quản lý từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

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

  // Lọc sản phẩm theo từ khóa tìm kiếm (không phân biệt chữ hoa chữ thường)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="pl-5 pt-5 h-screen">
      <div className="p-5 shadow-xl h-auto">
        <h2 className="text-[28px] font-medium mb-4 ">Danh sách sản phẩm</h2>

        <Formik initialValues={{ keyword: "" }} onSubmit={() => {}}>
          {({}) => (
            <Form>
              <FormikTextField
                name="keyword"
                label="Tìm kiếm sản phẩm"
                className="mt-7"
              />
            </Form>
          )}
        </Formik>

        <Button onClick={handleAdd} className="my-5">
          Thêm sản phẩm
        </Button>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Tên sản phẩm</th>
              <th className="border p-2">Giá</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">
                    {product.price.toLocaleString()} đ
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-200"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-2 text-center">
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination pageCount={10} className="ml-auto mt-10" />
      </div>
    </main>
  );
};

export default Home;
