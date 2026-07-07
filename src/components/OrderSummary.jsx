import React from 'react';
import { formatCLP } from '../services/menuData';

function OrderSummary({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const total = cartItems.reduce((sum, item) => sum + (item.dish.precio * item.quantity), 0);

  return (
    <div className="order-summary" id="order-summary-panel">
      <h2>Tu Pedido</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon" role="img" aria-label="Plato vacío">🍽️</span>
          <p>¿Qué te gustaría probar hoy?</p>
          <p className="subtitle">Agrega platos desde el menú para empezar tu pedido.</p>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.dish.id} id={`cart-item-${item.dish.id}`}>
                <div className="cart-item-details">
                  <div className="cart-item-text">
                    <h4>{item.dish.nombre}</h4>
                    <span className="cart-item-price-unit">
                      {formatCLP(item.dish.precio)} c/u
                    </span>
                  </div>
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button 
                      type="button" 
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="btn-qty"
                      aria-label="Disminuir cantidad"
                      id={`btn-qty-dec-${item.dish.id}`}
                    >
                      -
                    </button>
                    <span className="qty-number" id={`qty-num-${item.dish.id}`}>{item.quantity}</span>
                    <button 
                      type="button" 
                      onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                      className="btn-qty"
                      aria-label="Aumentar cantidad"
                      id={`btn-qty-inc-${item.dish.id}`}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    type="button" 
                    className="btn-delete" 
                    onClick={() => onRemoveItem(item.dish.id)}
                    aria-label="Eliminar plato"
                    id={`btn-delete-${item.dish.id}`}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-totals">
            <div className="total-row">
              <span>Total:</span>
              <span className="total-amount" id="order-total-amount">{formatCLP(total)}</span>
            </div>
            
            <button 
              type="button" 
              className="btn-primary btn-checkout" 
              onClick={onCheckout}
              id="btn-checkout"
            >
              Realizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
