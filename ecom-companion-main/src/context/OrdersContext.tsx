import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { db } from "@/config/firebase";
import { doc, collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "./AuthContext";

export interface Order {
  id: string;
  orderNumber: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  address: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: Date;
}

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<string>;
  loadOrders: () => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load orders when user logs in
  useEffect(() => {
    if (user) {
      loadOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const loadOrders = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "orders"));
      const loadedOrders: Order[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        loadedOrders.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        } as Order);
      });

      // Sort by date descending
      loadedOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setOrders(loadedOrders);
      
      // Also save to localStorage
      localStorage.setItem(
        `orders_${user.uid}`,
        JSON.stringify(
          loadedOrders.map(o => ({
            ...o,
            createdAt: o.createdAt.toISOString()
          }))
        )
      );
    } catch (error) {
      console.log("Firestore not available, checking localStorage", error);
      
      // Fallback to localStorage
      const savedOrders = localStorage.getItem(`orders_${user.uid}`);
      if (savedOrders) {
        try {
          const parsed = JSON.parse(savedOrders);
          const ordersWithDates = parsed.map((o: any) => ({
            ...o,
            createdAt: new Date(o.createdAt)
          }));
          setOrders(ordersWithDates);
        } catch (err) {
          console.error("Error parsing stored orders:", err);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addOrder = useCallback(
    async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
      if (!user) throw new Error("User must be logged in to create order");

      const newOrder = {
        id: `order_${Date.now()}`,
        ...orderData,
        createdAt: new Date(),
      };

      try {
        const docRef = await addDoc(
          collection(db, "users", user.uid, "orders"),
          {
            ...orderData,
            userId: user.uid,
            createdAt: Timestamp.now(),
          }
        );
        newOrder.id = docRef.id;
        console.log("Order saved to Firestore");
      } catch (error) {
        console.log("Could not save to Firestore (rules may need updating), but order saved to localStorage", error);
      }

      // Always save to localStorage
      try {
        const existingOrders = localStorage.getItem(`orders_${user.uid}`);
        const ordersList = existingOrders ? JSON.parse(existingOrders) : [];
        ordersList.unshift({
          ...newOrder,
          createdAt: newOrder.createdAt.toISOString()
        });
        localStorage.setItem(`orders_${user.uid}`, JSON.stringify(ordersList));
      } catch (err) {
        console.error("Error saving to localStorage:", err);
      }

      // Add to local state
      setOrders((prev) => [newOrder, ...prev]);

      return newOrder.id;
    },
    [user]
  );

  return (
    <OrdersContext.Provider value={{ orders, loading, addOrder, loadOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
};
