 
import { useState } from 'react'
import './App.css'


const products = [
  { id: 1, name: 'Rice', category: 'Rice', unit: '1 kg', price: 115, image: '/Mahaneya-General-Store/products/rice.jpg' },
  { id: 2, name: 'Toor Dal', category: 'Dal', unit: '1 kg', price: 140, image: '/Mahaneya-General-Store/products/Toor%20dal.webp' },
  { id: 3, name: 'Cooking Oil', category: 'freedom sunflower Oil', unit: '1 litre', price: 185, image: '/Mahaneya-General-Store/products/cooking%20oil.jpg' },
  { id: 4, name: 'Bath Soap', category: 'Soaps', unit: '1 piece', price: 45, image: '/Mahaneya-General-Store/products/lux.jpg' },
  { id: 5, name: 'Sugar', category: 'Groceries', unit: '1 kg', price: 50, image: '/Mahaneya-General-Store/products/sugar.jpg' },
  { id: 6, name: 'Wheat Flour', category: 'Groceries', unit: '1 kg', price: 65, image: '/Mahaneya-General-Store/products/wheatflour.webp' },
]


function App() {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id)

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  function changeQuantity(id, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
)

 
  function orderOnWhatsApp() {
    if (cart.length === 0) {
      alert('Please add products to your cart first!')
      return
    }

    const message = `
Hello Mahaneya General Store!

My Order:
${cart.map((item) => `${item.name} (${item.unit}) x ${item.quantity} = ₹${item.price * item.quantity}`).join('\n')}

Total: ₹${total}

Fulfilment: Pickup or Home Delivery
Payment: Cash or UPI after confirmation

Please confirm product availability and my order.
Thank you!
    `.trim()

    const shopWhatsAppNumber = '8790891245'

    const whatsappUrl = `https://wa.me/${shopWhatsAppNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
  }


  return (
    <div className="app">
      <header className="navbar">
        <h2>🌿 Mahaneya General Store</h2>
        <a href="#cart">🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</a>
      </header>

      <main className="hero">
        <p className="tagline">YOUR NEIGHBOURHOOD STORE</p>
        <h1>Daily essentials, <span>made easy.</span></h1>
        <p className="description">
          Groceries, Rice, dal, soaps and cooking oil — All in one place.
        </p>
        <a href="#products" className="shop-button">Shop Products ↓</a>
        <p className="location">
          📍 Sivayya Sthupam Road, opposite Government Hospital,Beside kokila bookstore, Vinukonda
        </p>
      </main>

      <section id="products" className="products">
        <h2>Our Products 🛍️</h2>
        <p>Choose your daily essentials.</p>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
               <div className="product-emoji">
  <img src={product.image} alt={product.name} />
</div>
              <h3>{product.name}</h3>
              <p>{product.unit}</p>
              <strong>₹{product.price}</strong>
              <button onClick={() => addToCart(product)}>
                + Add to Cart
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="cart" className="cart-section">
        <h2>Your Cart 🛒</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty. Add some products!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <span>{item.name} — ₹{item.price}</span>
                <div className="quantity-controls">
                  <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                </div>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <h3 className="total">Total: ₹{total}</h3>
            <p>Payment: Cash or UPI after order confirmation.</p>
            <p>Fulfilment: Pickup or delivery, subject to shop confirmation.</p>
            
<button
  className="whatsapp-button"
  onClick={orderOnWhatsApp}
>
  Order on WhatsApp
</button>
 
          </>
        )}
      </section>

      <footer>
        <p>© Mahaneya General Store · Vinukonda</p>
      </footer>
    </div>
  )
}

export default App
