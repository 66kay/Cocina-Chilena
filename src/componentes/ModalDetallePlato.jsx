import React from 'react';
import { formatearCLP } from '../servicios/datosMenu';

function ModalDetallePlato({ plato, onClose, onAgregarCarrito }) {
  if (!plato) return null;

  // Cerrar al hacer clic fuera del contenido del modal (en el fondo)
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
          {plato.imagen ? (
            <img src={plato.imagen} alt={plato.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>[Foto de Referencia]</span>
          )}
        </div>

        <div className="modal-body">
          <span className="modal-category-tag">
            {plato.categoria === 'fondos' ? 'Plato de Fondo' : 
             plato.categoria === 'entradas' ? 'Entrada' : 'Postre / Bebida'}
          </span>
          <h2>{plato.nombre}</h2>
          <p className="modal-description">{plato.descripcion}</p>

          <div className="ingredients-section">
            <h3>Ingredientes Principales:</h3>
            <ul className="ingredients-list">
              {plato.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
          </div>

          <div className="modal-footer">
            <span className="modal-price">{formatearCLP(plato.precio)}</span>
            <button 
              type="button" 
              className="btn-primary btn-large" 
              onClick={() => {
                onAgregarCarrito(plato);
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

export default ModalDetallePlato;
