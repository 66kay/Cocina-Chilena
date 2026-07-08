import React, { useState } from 'react';
import { formatearCLP } from '../servicios/datosMenu';

function ResumenPedido({ itemsCarrito, onActualizarCantidad, onEliminarElemento, onConfirmarPedido }) {
  const [tipoPedido, setTipoPedido] = useState('mesa');
  const [numeroMesa, setNumeroMesa] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mostrarError, setMostrarError] = useState(false);

  const total = itemsCarrito.reduce((suma, item) => suma + (item.plato.precio * item.cantidad), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipoPedido === 'mesa' && !numeroMesa.trim()) {
      setMostrarError(true);
      return;
    }
    if (tipoPedido === 'delivery' && !direccion.trim()) {
      setMostrarError(true);
      return;
    }
    
    setMostrarError(false);
    onConfirmarPedido({
      tipo: tipoPedido,
      numeroMesa: tipoPedido === 'mesa' ? numeroMesa.trim() : null,
      direccion: tipoPedido === 'delivery' ? direccion.trim() : null
    });
  };

  return (
    <div className="order-summary" id="order-summary-panel">
      <h2>Tu Pedido</h2>

      {itemsCarrito.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon" role="img" aria-label="Plato vacío">🍽️</span>
          <p>¿Qué te gustaría probar hoy?</p>
          <p className="subtitle">Agrega platos desde el menú para empezar tu pedido.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="order-summary-form">
          <div className="cart-items-list">
            {itemsCarrito.map((item) => (
              <div className="cart-item" key={item.plato.id} id={`cart-item-${item.plato.id}`}>
                <div className="cart-item-details">
                  <div className="cart-item-text">
                    <h4>{item.plato.nombre}</h4>
                    <span className="cart-item-price-unit">
                      {formatearCLP(item.plato.precio)} c/u
                    </span>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => onActualizarCantidad(item.plato.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                      className="btn-qty"
                      aria-label="Disminuir cantidad"
                      id={`btn-qty-dec-${item.plato.id}`}
                    >
                      -
                    </button>
                    <span className="qty-number" id={`qty-num-${item.plato.id}`}>{item.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => onActualizarCantidad(item.plato.id, item.cantidad + 1)}
                      className="btn-qty"
                      aria-label="Aumentar cantidad"
                      id={`btn-qty-inc-${item.plato.id}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => onEliminarElemento(item.plato.id)}
                    aria-label="Eliminar plato"
                    id={`btn-delete-${item.plato.id}`}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-type-section">
            <h3>Tipo de Pedido</h3>
            <div className="order-type-tabs">
              <button
                type="button"
                className={`order-type-btn ${tipoPedido === 'mesa' ? 'active' : ''}`}
                onClick={() => { setTipoPedido('mesa'); setMostrarError(false); }}
                id="btn-order-type-mesa"
              >
                🍽️ En Mesa
              </button>
              <button
                type="button"
                className={`order-type-btn ${tipoPedido === 'delivery' ? 'active' : ''}`}
                onClick={() => { setTipoPedido('delivery'); setMostrarError(false); }}
                id="btn-order-type-delivery"
              >
                🛵 Delivery
              </button>
            </div>

            {tipoPedido === 'mesa' ? (
              <div className="order-type-input-container">
                <label className="order-type-label" htmlFor="table-number-input">
                  Número de Mesa
                </label>
                <input
                  type="number"
                  id="table-number-input"
                  className="order-type-input"
                  placeholder="Ej: 5"
                  min="1"
                  value={numeroMesa}
                  onChange={(e) => { setNumeroMesa(e.target.value); setMostrarError(false); }}
                />
                {mostrarError && !numeroMesa.trim() && (
                  <span className="order-type-error" id="table-number-error">
                    Por favor, ingresa el número de mesa.
                  </span>
                )}
              </div>
            ) : (
              <div className="order-type-input-container">
                <label className="order-type-label" htmlFor="delivery-address-input">
                  Dirección de Envío
                </label>
                <input
                  type="text"
                  id="delivery-address-input"
                  className="order-type-input"
                  placeholder="Ej: Av. Providencia 1234, depto 402"
                  value={direccion}
                  onChange={(e) => { setDireccion(e.target.value); setMostrarError(false); }}
                />
                {mostrarError && !direccion.trim() && (
                  <span className="order-type-error" id="delivery-address-error">
                    Por favor, ingresa la dirección de envío.
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="cart-totals">
            <div className="total-row">
              <span>Total:</span>
              <span className="total-amount" id="order-total-amount">{formatearCLP(total)}</span>
            </div>

            <button
              type="submit"
              className="btn-primary btn-checkout"
              id="btn-checkout"
            >
              Realizar Pedido
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ResumenPedido;
