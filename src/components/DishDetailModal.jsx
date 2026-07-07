import React from 'react';
import { formatCLP } from '../services/menuData';

function DishDetailModal({ dish, onClose, onAddToCart }) {
  if (!dish) return null;

  // Handle clicking outside the modal content to close
  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} id="dish-modal">
      <div className="modal-content animate-pop">
        <button 
          type="button" 
          className="close-button" 
          onClick={onClose}
          aria-label="Cerrar modal"
          id="btn-close-modal"
        >
          &times;
        </button>
        
        <div className="modal-hero">
          {dish.imagen ? (
            <img src={dish.imagen} alt={dish.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>[Foto de Referencia]</span>
          )}
        </div>

        <div className="modal-body">
          <span className="modal-category-tag">
            {dish.categoria === 'fondos' ? 'Plato de Fondo' : 
             dish.categoria === 'entradas' ? 'Entrada' : 'Postre / Bebida'}
          </span>
          <h2>{dish.nombre}</h2>
          <p className="modal-description">{dish.descripcion}</p>

          <div className="ingredients-section">
            <h3>Ingredientes Principales:</h3>
            <ul className="ingredients-list">
              {dish.ingredientes.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="modal-footer">
            <span className="modal-price">{formatCLP(dish.precio)}</span>
            <button 
              type="button" 
              className="btn-primary btn-large" 
              onClick={() => {
                onAddToCart(dish);
                onClose();
              }}
              id="btn-modal-add"
            >
              Agregar al Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishDetailModal;
