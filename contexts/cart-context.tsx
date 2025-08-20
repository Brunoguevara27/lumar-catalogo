"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  showNotification: boolean
  lastAddedItem: CartItem | null
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "HIDE_NOTIFICATION" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      let updatedItems: CartItem[]
      let lastAddedItem: CartItem

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        lastAddedItem = { ...existingItem, quantity: existingItem.quantity + 1 }
      } else {
        const newItem = { ...action.payload, quantity: 1 }
        updatedItems = [...state.items, newItem]
        lastAddedItem = newItem
      }

      return {
        ...state,
        items: updatedItems,
        showNotification: true,
        lastAddedItem,
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
          .filter((item) => item.quantity > 0),
      }
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
      }
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        showNotification: false,
        lastAddedItem: null,
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    showNotification: false,
    lastAddedItem: null,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("lumar-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("lumar-cart", JSON.stringify(state.items))
  }, [state.items])

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (state.showNotification) {
      const timer = setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" })
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [state.showNotification])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
