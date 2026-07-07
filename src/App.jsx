import React, { useState, useEffect } from 'react';
import { menuData, categories } from './services/menuData';
import DishCard from './components/DishCard';
import DishDetailModal from './components/DishDetailModal';
import OrderSummary from './components/OrderSummary';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedDish, setSelectedDish] = useState(null);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  // Auto-hide notification banner after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Add item to cart
  const handleAddToCart = (dish) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.dish.id === dish.id);
      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        // Add new item to cart
        return [...prevCart, { dish, quantity: 1 }];
      }
    });
  };

  // Modify quantity of item in cart
  const handleUpdateQuantity = (dishId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(dishId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.dish.id === dishId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item.dish.id !== dishId));
  };

  // Checkout simulation
  const handleCheckout = () => {
    setNotification('¡Tu pedido ha sido recibido! Estamos preparando tus platos con mucho cariño.');
    setCart([]);
  };

  // Filter menu items based on active category and search input
  const filteredDishes = menuData.filter((dish) => {
    const matchesCategory = selectedCategory === 'todos' || dish.categoria === selectedCategory;
    const matchesSearch = dish.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Background Accent Decorative Elements */}
      <header className="app-header">
        <div className="header-accent"></div>
        <h1 id="app-title">Cocina Chilena</h1>
        <p>Disfruta de la mejor selección de recetas tradicionales chilenas directas a tu mesa.</p>
      </header>

      {/* Control Section: Filter Category & Search Bar */}
      <section className="controls-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="Busca empanadas, pastel de choclo, cazuela..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="menu-search-input"
          />
        </div>

        <nav className="category-tabs" aria-label="Categorías de menú">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`btn-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              id={`btn-tab-${category.id}`}
            >
              {category.nombre}
            </button>
          ))}
        </nav>
      </section>

      {/* Main App Grid Layout */}
      <main className="main-content">
        <section className="dishes-column" aria-label="Lista de Platos">
          <div className="dishes-grid">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onSelect={setSelectedDish}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <div className="no-results" id="search-no-results">
                <span className="no-results-icon" role="img" aria-label="Sin resultados">🔍</span>
                <p>No encontramos platos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </section>

        {/* Sidebar/Responsive Cart panel */}
        <aside className="summary-column" aria-label="Resumen de Pedido">
          <OrderSummary
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </aside>
      </main>

      {/* Detailed Modal Overlay */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Visual Success Confirmation Banner */}
      {notification && (
        <div className="notification-banner" id="order-success-banner" role="alert">
          <span className="notification-banner-icon">🎉</span>
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}

export default App;
