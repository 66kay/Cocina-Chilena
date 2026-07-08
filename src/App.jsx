import React, { useState, useEffect } from 'react';
import { datosPlatos, categorias } from './servicios/datosMenu';
import TarjetaPlato from './componentes/TarjetaPlato';
import ModalDetallePlato from './componentes/ModalDetallePlato';
import ResumenPedido from './componentes/ResumenPedido';
import './App.css';

function App() {
  const [buscarTexto, setBuscarTexto] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [notificacion, setNotificacion] = useState(null);

  // Ocultar notificación automáticamente después de 4 segundos
  useEffect(() => {
    if (notificacion) {
      const timer = setTimeout(() => {
        setNotificacion(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notificacion]);

  // Agregar plato al carrito
  const handleAgregarAlCarrito = (plato) => {
    const existe = carrito.find((item) => item.plato.id === plato.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.plato.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { plato, cantidad: 1 }]);
    }
  };

  // Modificar cantidad en el carrito
  const handleActualizarCantidad = (platoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      handleEliminarElemento(platoId);
      return;
    }
    setCarrito(
      carrito.map((item) =>
        item.plato.id === platoId ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  // Eliminar elemento del carrito
  const handleEliminarElemento = (platoId) => {
    setCarrito(carrito.filter((item) => item.plato.id !== platoId));
  };

  // Simulación de checkout
  const handleRealizarPedido = (detallesPedido) => {
    const msgDetalle = detallesPedido.tipo === 'mesa'
      ? `para la Mesa ${detallesPedido.numeroMesa}`
      : `con entrega a domicilio en "${detallesPedido.direccion}"`;

    setNotificacion(`¡Tu pedido ${msgDetalle} ha sido recibido! Estamos preparando tus platos con mucho cariño.`);
    setCarrito([]);
  };

  // Filtrado de platos
  const platosFiltrados = datosPlatos.filter((plato) => {
    const coincideCategoria = categoriaSeleccionada === 'todos' || plato.categoria === categoriaSeleccionada;
    const coincideBusqueda = plato.nombre.toLowerCase().includes(buscarTexto.toLowerCase()) ||
      plato.descripcion.toLowerCase().includes(buscarTexto.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-accent"></div>
        <h1 id="app-title">Cocina Chilena</h1>
        <p>Disfruta de la mejor selección de recetas tradicionales chilenas directas a tu mesa.</p>
      </header>

      {/* Controles: Buscador y Categorías */}
      <section className="controls-section">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="Busca empanadas, pastel de choclo, cazuela..."
            className="search-input"
            value={buscarTexto}
            onChange={(e) => setBuscarTexto(e.target.value)}
            id="menu-search-input"
          />
        </div>

        <nav className="category-tabs" aria-label="Categorías de menú">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`btn-tab ${categoriaSeleccionada === cat.id ? 'active' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              id={`btn-tab-${cat.id}`}
            >
              {cat.nombre}
            </button>
          ))}
        </nav>
      </section>

      {/* Cuerpo principal */}
      <main className="main-content">
        <section className="dishes-column" aria-label="Lista de Platos">
          <div className="dishes-grid">
            {platosFiltrados.length > 0 ? (
              platosFiltrados.map((plato) => (
                <TarjetaPlato
                  key={plato.id}
                  plato={plato}
                  onSeleccionar={setPlatoSeleccionado}
                  onAgregarCarrito={handleAgregarAlCarrito}
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

        {/* Resumen de Pedido */}
        <aside className="summary-column" aria-label="Resumen de Pedido">
          <ResumenPedido
            itemsCarrito={carrito}
            onActualizarCantidad={handleActualizarCantidad}
            onEliminarElemento={handleEliminarElemento}
            onConfirmarPedido={handleRealizarPedido}
          />
        </aside>
      </main>

      {/* Modal de Detalle */}
      {platoSeleccionado && (
        <ModalDetallePlato
          plato={platoSeleccionado}
          onClose={() => setPlatoSeleccionado(null)}
          onAgregarCarrito={handleAgregarAlCarrito}
        />
      )}

      {/* Banner de Notificación */}
      {notificacion && (
        <div className="notification-banner" id="order-success-banner" role="alert">
          <span className="notification-banner-icon">🎉</span>
          <span>{notificacion}</span>
        </div>
      )}
    </div>
  );
}

export default App;
