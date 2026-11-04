"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { CreateOrderInput, Order, OrderStatus, Product, ProductInput, SellerDeskData } from "@/types";
import { storage } from "@/lib/storage";
import { canDeleteProduct, createProduct, updateProduct, validateProductInput } from "@/lib/product-service";
import { createOrder as createOrderService, transitionOrderStatus } from "@/lib/order-service";

export function useSellerDesk() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialData = storage.load();
    setProducts(initialData.products);
    setOrders(initialData.orders);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      const data: SellerDeskData = { products, orders };
      storage.save(data);
    }
  }, [products, orders, isReady]);

  const saveProduct = useCallback((input: ProductInput, productId?: string): string | null => {
    const validationError = validateProductInput(input, products, productId);
    if (validationError) return validationError;

    if (productId) {
      const existingProduct = products.find((product) => product.id === productId);
      if (!existingProduct) return "This product no longer exists. Refresh and try again.";
      setProducts((current) => current.map((product) =>
        product.id === productId ? updateProduct(product, input) : product,
      ));
      toast.success("Product updated successfully.");
      return null;
    }

    setProducts((current) => [createProduct(input), ...current]);
    toast.success("Product added to your inventory.");
    return null;
  }, [products]);

  const deleteProduct = useCallback((product: Product): string | null => {
    if (!canDeleteProduct(product.id, orders)) {
      return "This product is used in an order and cannot be deleted in this demo.";
    }
    setProducts((current) => current.filter((item) => item.id !== product.id));
    toast.success("Product deleted.");
    return null;
  }, [orders]);

  const createNewOrder = useCallback((input: CreateOrderInput): string | null => {
    const result = createOrderService(input, products);
    if (!result.success) return result.error;
    setOrders((current) => [result.order, ...current]);
    toast.success("Order created. Confirm it when the seller is ready.");
    return null;
  }, [products]);

  const updateOrderStatus = useCallback((order: Order, nextStatus: OrderStatus) => {
    const result = transitionOrderStatus(order, nextStatus, orders, products);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    setOrders(result.orders);
    setProducts(result.products);
    toast.success(result.message);
  }, [orders, products]);

  return {
    products,
    orders,
    isReady,
    saveProduct,
    deleteProduct,
    createNewOrder,
    updateOrderStatus,
  };
}
