export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem =Pick<Guitar,'id'|'image'|'name'|'price'>&{
    quantity: number
} 
//export type CartItemOmit =Omit<Guitar,'description'|'image'>

/*
// forma 1
export type GuitarId={
    id:number
}
    */
// forma 2
// export type GuitarId=Pick<Guitar,'id'>
// forma 3: luck up 
//export type GuitarId=Guitar['id'];

/*   
// si fuera interface
export interface CartItem extends Guitar {
    quantity: number
}
    */


