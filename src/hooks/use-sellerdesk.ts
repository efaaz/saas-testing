"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { CreateOrderInput, DeliveryCharges, Order, OrderStatus, Product, ProductInput, SellerDeskData } from "@/types";
import { DEFAULT_DELIVERY_CHARGES } from "@/lib/constants";
import { storage } from "@/lib/storage";
import { canDeleteProduct, createProduct, updateProduct, validateProductInput } from "@/lib/product-service";
import { createOrder as createOrderService, transitionOrderStatus } from "@/lib/order-service";

export function useSellerDesk() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryCharges, setDeliveryCharges] = useState<DeliveryCharges>(DEFAULT_DELIVERY_CHARGES);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialData = storage.load();
    setProducts(initialData.products);
    setOrders(initialData.orders);
    setDeliveryCharges(initialData.deliveryCharges);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      const data: SellerDeskData = { products, orders, deliveryCharges };
      storage.save(data);
    }
  }, [products, orders, deliveryCharges, isReady]);

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
    const result = createOrderService(input, products, deliveryCharges);
    if (!result.success) return result.error;
    setOrders((current) => [result.order, ...current]);
    toast.success("Order created. Confirm it when the seller is ready.");
    return null;
  }, [products, deliveryCharges]);

  const updateDeliveryCharges = useCallback((charges: DeliveryCharges): string | null => {
    if (
      !Number.isInteger(charges.INSIDE_DHAKA) || charges.INSIDE_DHAKA < 0 ||
      !Number.isInteger(charges.OUTSIDE_DHAKA) || charges.OUTSIDE_DHAKA < 0
    ) {
      return "Enter a whole number of 0 or more for each delivery charge.";
    }
    setDeliveryCharges(charges);
    toast.success("Delivery charges updated. New orders will use these rates.");
    return null;
  }, []);

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
    deliveryCharges,
    isReady,
    saveProduct,
    deleteProduct,
    createNewOrder,
    updateDeliveryCharges,
    updateOrderStatus,
  };
}
