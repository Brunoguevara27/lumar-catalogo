import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ProductCatalog from "@/components/product-catalog"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import CartButton from "@/components/cart-button"
import AdminNotice from "@/components/admin-notice"
import CartNotification from "@/components/cart-notification"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AdminNotice />
      <CartNotification />
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <Contact />
      </main>
      <Footer />
      <Cart />
      <CartButton />
    </div>
  )
}
