import {Person} from "./person"
import { ProductCart } from "./ProductCart"

export default interface AppContext {
    cart:ProductCart[]
    changeCart: (cartArr: ProductCart[]) => void
}
