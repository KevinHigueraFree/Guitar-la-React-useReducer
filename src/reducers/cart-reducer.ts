import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

export type CartActions =
    {
        type: 'add-to-cart',
        payload: { item: Guitar }
    } |
    {
        type: 'remove-from-cart',
        payload: { id: Guitar['id'] }
    } |
    {
        type: 'decrease-quantity',
        payload: { id: Guitar['id'] }
    } |
    {
        type: 'increase-quantity',
        payload: { id: Guitar['id'] }
    } |
    {
        type: 'clear-cart'
    }
export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}


const MIN_ITEMS = 1
const MAX_ITEMS = 5

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {

    if (action.type === 'add-to-cart') {

        // finde retorna el elemento cuando existe en el state.cart
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

        let updatedCart: CartItem[] = []

        if (itemExists) { // existe en el carrito
            updatedCart = state.cart.map(item => {

                if (item.id === action.payload.item.id) {

                    if (item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }

                } else {
                    return item
                }
            })
        } else {
            //newItem es de tipo CartItem, quien es igual a una copia de item y se le agrega la propiedad quantity
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            // es seteado en nuestro carrito que tiene una copia de cart, y se le pasa el new item
            updatedCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'remove-from-cart') {
        const updatedCart = state.cart.filter(guitar => guitar.id !== action.payload.id);
        // (prevCart => prevCart.filter(guitar => guitar.id !== id))
        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'decrease-quantity') {
        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity -1
                }
            }
            return item
        })

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'increase-quantity') {
        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
       
        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: []
        }

    }
    return state
}