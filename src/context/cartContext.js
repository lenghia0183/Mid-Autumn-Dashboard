import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useAddProductToCart,
  useDeleteCartDetail,
  useUpdateCartDetail,
  useGetMyCart,
} from "../service/https/cart";
import { useUser } from "./userContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useUser();

  const { trigger: addProductToCart, isMutating: isAdding } =
    useAddProductToCart();
  const { trigger: deleteCartDetail, isMutating: isDeleting } =
    useDeleteCartDetail();
  const { trigger: updateCartDetail, isMutating: isUpdating } =
    useUpdateCartDetail();
  const {
    data: cartData,
    isGetting,
    isValidating: isValidatingGetMyCart,
    mutate: refreshCart,
  } = useGetMyCart(user.isLoggedIn);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(
      isGetting || isAdding || isDeleting || isUpdating || isValidatingGetMyCart
    );
  }, [isGetting, isAdding, isDeleting, isUpdating, isValidatingGetMyCart]);

  const refreshCartData = useCallback(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        cartData,
        addProductToCart,
        deleteCartDetail,
        updateCartDetail,
        refreshCart: refreshCartData,
        isLoading,
        isAdding,
        isDeleting,
        isUpdating,
        isGetting,
        isValidatingGetMyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
