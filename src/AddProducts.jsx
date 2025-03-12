import { useState, useEffect, useContext } from "react";
import { ProductContext } from "./context/context";
import "./AddProducts.css";

export const AddProducts = () => {
  const { handleAddToList, Products } = useContext(ProductContext);

  // Estados locales
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    console.log(Products);
  }, [Products]);

  // Obtener tiendas únicas
  const availableShop = [...new Set(Products.map(shop => shop.name))];

  // Obtener categorías según la tienda seleccionada
  const availableCategories = selectedShop
    ? [...new Set(
        Products.find(shop => shop.name === selectedShop)?.categories.map(cat => cat.name) || []
      )]
    : [];

  // Obtener productos según la categoría seleccionada
  const availableProducts = selectedShop && selectedCategory
    ? Products.find(shop => shop.name === selectedShop)
        ?.categories.find(cat => cat.name === selectedCategory)
        ?.products || []
    : [];

  // Obtener datos del producto seleccionado
  const productoSeleccionado = availableProducts.find(prod => prod.name === selectedProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productoSeleccionado) {
      handleAddToList(productoSeleccionado);
    }
  };

  return (
    <div className="product-container-add-left">
      <h2>Agregar</h2>
      <form onSubmit={handleSubmit} className="add-form">
        {/* Tienda */}
        <div className="container-input">
          <h4>Tienda</h4>
          <select className="input" value={selectedShop} onChange={(e) => setSelectedShop(e.target.value)}>
            <option value="">Selecciona una tienda</option>
            {availableShop.map((shop, index) => (
              <option key={index} value={shop}>{shop}</option>
            ))}
          </select>
        </div>

        {/* Categoría */}
        <div className="container-input">
          <h4>Categoría</h4>
          <select className="input" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} disabled={!selectedShop}>
            <option value="">Selecciona una categoría</option>
            {availableCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Nombre del producto */}
        <div className="container-input">
          <h4>Nombre</h4>
          <select className="input" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} disabled={!selectedCategory}>
            <option value="">Selecciona un producto</option>
            {availableProducts.map((product, index) => (
              <option key={index} value={product.name}>{product.name}</option>
            ))}
          </select>
        </div>

        {/* Mostrar automáticamente la marca y el precio */}
        {productoSeleccionado && (
          <div className="container-input">
            <h4>Marca: {productoSeleccionado.brand}</h4>
            <h4>Precio: ${productoSeleccionado.price}</h4>
          </div>
        )}

        <button type="submit" disabled={!productoSeleccionado}>Agregar a la lista</button>
      </form>
    </div>
  );
};
