import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product, products } from "@/data/products";
import { db } from "@/config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      loadCartFromFirestore(user.uid).then(() => setIsLoading(false));
    } else {
      // Clear cart when user logs out
      setItems([]);
    }
  }, [user?.uid]);

  // Save cart to Firestore whenever items change (if user is logged in)
  useEffect(() => {
    if (user && !isLoading) {
      saveCartToFirestore(user.uid, items);
    }
  }, [items, user?.uid, isLoading]);

  const loadCartFromFirestore = async (userId: string) => {
    try {
      console.log("🔄 Loading cart for user:", userId);
      
      const cartRef = doc(db, "carts", userId);
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        const cartData = cartDoc.data();
        console.log("📦 Raw data from Firestore:", cartData);
        
        // Handle both old and new data structures
        const cartItems = cartData.items || cartData.cartItems || [];
        
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
          console.log("⚠️ Firestore has invalid/empty cart data, checking localStorage...");
          throw new Error("Invalid data structure");
        }
        
        // Map product IDs back to full product objects
        const loadedItems = cartItems.map((item: any) => {
          const product = products.find(p => p.id === item.productId);
          if (!product) {
            console.warn("⚠️ Product not found:", item.productId);
          }
          return {
            product: product || products[0],
            quantity: item.quantity
          };
        });
        
        if (loadedItems.length > 0) {
          setItems(loadedItems);
          console.log("✅ Cart successfully loaded from Firestore:", loadedItems.length, "items");
          return;
        }
      } else {
        console.log("📭 No cart found in Firestore, checking localStorage...");
      }
    } catch (error: any) {
      console.error("❌ Error loading from Firestore:", error.message);
    }

    // Fallback to localStorage
    try {
      const savedCart = localStorage.getItem(`cart_${userId}`);
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        if (Array.isArray(cartData) && cartData.length > 0) {
          const loadedItems = cartData.map((item: any) => {
            const product = products.find(p => p.id === item.productId);
            return {
              product: product || products[0],
              quantity: item.quantity
            };
          });
          setItems(loadedItems);
          console.log("✅ Cart loaded from localStorage:", loadedItems.length, "items");
          return;
        }
      }
      console.log("📭 No cart in localStorage either - starting with empty cart");
    } catch (err) {
      console.error("❌ Error loading from localStorage:", err);
    }
  };

  const saveCartToFirestore = async (userId: string, cartItems: CartItem[]) => {
    if (!cartItems || cartItems.length === 0) {
      console.log("ℹ️ Cart is empty, not saving");
      return;
    }

    const cartData = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
    
    console.log("💾 Saving", cartData.length, "items");
    
    // Always save to localStorage
    try {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartData));
      console.log("✅ Cart saved to localStorage");
    } catch (err) {
      console.error("❌ Error saving to localStorage:", err);
    }

    // Try to save to Firestore
    try {
      const cartRef = doc(db, "carts", userId);
      await setDoc(cartRef, {
        items: cartData,
        updatedAt: new Date().toISOString(),
        userId: userId
      }, { merge: true });
      console.log("✅ Cart saved to Firestore");
    } catch (error: any) {
      console.warn("⚠️ Firestore error (cart saved to localStorage):", error.message);
    }
  };

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
