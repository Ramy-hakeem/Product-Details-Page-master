import Header from './components/Header'
import Footer from './components/Footer'
import ProductDetails from './components/ProductDetails'
import CartDrawer from './components/CartDrawer'
import WishlistDrawer from './components/WishlistDrawer'

/** Single page: the product shown, the cart and the wishlist are all in-page state (no routes or URLs). */
export default function App() {
  return (
    <>
      <Header />
      <ProductDetails />
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
    </>)
}
