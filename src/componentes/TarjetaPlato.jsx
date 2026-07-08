import React from 'react';
import { formatearCLP } from '../servicios/datosMenu';

function TarjetaPlato({ plato, onSeleccionar, onAgregarCarrito }) {
  return (
    <div className="dish-card" id={`dish-${plato.id}`}>
      <div className="dish-image-placeholder">
        {plato.imagen ? (
          <img src={plato.imagen} alt={plato.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span>[Foto de Referencia]</span>
        )}
      </div>
      <div className="dish-info">
        <div className="dish-header">
          <h3>{plato.nombre}</h3>
          <span className="dish-price">{formatearCLP(plato.precio)}</span>
        </div>
        <p className="dish-description">{plato.descripcion}</p>
        <div className="dish-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onSeleccionar(plato)}
            id={`btn-view-${plato.id}`}
          >
            Ver Detalles
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => onAgregarCarrito(plato)}
            id={`btn-add-${plato.id}`}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaPlato;
