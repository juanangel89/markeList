import { useContext, useState } from "react";
import { ProductContext } from "./context/context";
import "./ListProducts.css";

export const ListProducts = () => {
  const { listAddProducts, handleRemoveFromList } = useContext(ProductContext);

  // Estados para filtros
  const [filterName, setFilterName] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterShop, setFilterShop] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  // Filtro aplicado a los productos
  const filteredProducts = listAddProducts.filter((product) => {
    return (
      product.name.toLowerCase().includes(filterName.toLowerCase()) &&
      product.brand.toLowerCase().includes(filterBrand.toLowerCase()) &&
      product.nameShop.toLowerCase().includes(filterShop.toLowerCase()) &&
      product.categoryProduct.toLowerCase().includes(filterCategory.toLowerCase()) &&
      (filterPrice === "" || Number(product.price) <= Number(filterPrice))
    );
  });

  // Calcular total del filtrado
  const total = filteredProducts.reduce((sum, product) => sum + (Number(product.price) || 0), 0);

  return (
    <div className="product-container-list-right">
      <h2>Lista de productos agregados</h2>

      {/* Filtros */}
      <div className="filters">
        <h4>Filtrar por</h4>
      <input
          type="text"
          className="input"
          placeholder="tienda"
          value={filterShop}
          onChange={(e) => setFilterShop(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="categoría"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="producto"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="marca"
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
        />
        <input
          type="number"
          className="input"
          placeholder="Precio máximo"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
      </div>

      {/* Lista de productos */}
      <div className="product-container-list">
        <ul className="products-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-tittle product">
              <div className="product-info">
                <div className="product-info-detail"><p><span>Tienda</span> {product.nameShop || "Sin tienda"}</p></div>
                <div className="product-info-detail"><p><span>Categoría</span> {product.categoryProduct || "Sin categoría"}</p></div>
                <div className="product-info-detail"><p><span>Producto</span> {product.name}</p></div>
                <div className="product-info-detail"><p><span>Marca</span> {product.brand}</p></div>
                <div className="product-info-detail"><p><span>Und</span> {product.unit}</p></div>
              </div>
              <div className="product-info">
                <p><span>Precio</span> ${Number(product.price) || 0}</p>
              </div>
              <span className="delete-icon" onClick={() => handleRemoveFromList(product.id)}>X</span>
            </div>
          ))}
        </ul>
        <h2>Total: ${total}</h2>
      </div>
    </div>
  );
};
