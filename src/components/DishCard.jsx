import React from 'react';
import { formatCLP } from '../services/menuData';

function DishCard({ dish, onSelect, onAddToCart }) {
  return (
    <div className="dish-card" id={`dish-${dish.id}`}>
      <div className="dish-image-placeholder">
        {dish.imagen ? (
          <img src={dish.imagen} alt={dish.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span>[Foto de Referencia]</span>
        )}
      </div>
      <div className="dish-info">
        <div className="dish-header">
          <h3>{dish.nombre}</h3>
          <span className="dish-price">{formatCLP(dish.precio)}</span>
        </div>
        <p className="dish-description">{dish.descripcion}</p>
        <div className="dish-actions">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => onSelect(dish)}
            id={`btn-view-${dish.id}`}
          >
            Ver Detalles
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => onAddToCart(dish)}
            id={`btn-add-${dish.id}`}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
