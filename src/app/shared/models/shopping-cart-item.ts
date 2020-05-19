export interface ShoppingCartItem{
    items:Items[],
    _id:string,
    user_id:string,
}
export interface Items{
    _id:string,
    product_id:string,
    quantity:number
}