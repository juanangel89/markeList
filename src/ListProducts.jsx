import { useContext } from "react";
import { ProductContext } from "./context/context";
import "./ListProducts.css";

export const ListProducts = () => {
  const { listAddProducts, handleRemoveFromList } = useContext(ProductContext);

  // Calcular el total sumando los precios de los productos en la lista
  const total = listAddProducts.reduce((sum, product) => sum + (Number(product.price) || 0), 0);

  return (
    <div className="product-container-list-right">
      <h2>Lista de productos agregados</h2>
      <div className="product-container-list">
        <ul className="products-list">
          <li className="product-tittle">
            <div><p>Tienda</p></div>
            <div><p>Categoría</p></div>
            <div><p>Nombre</p></div>
            <div><p>Marca</p></div>
            <div><p>Unidad</p></div>
            <div><p>Precio</p></div>
          </li>

          {listAddProducts.map((product) => (
            <div key={product.id} className="product-tittle product">
              <div><p>{product.nameShop || "Sin tienda"}</p></div>
              <div><p>{product.categoryProduct || "Sin categoría"}</p></div>
              <div><p>{product.name}</p></div>
              <div><p>{product.brand}</p></div>
              <div><p>{product.unit}</p></div>
              <p>${Number(product.price) || 0}</p>
              <span className="delete-icon" onClick={() => handleRemoveFromList(product.id)}>X</span>
            </div>
          ))}
        </ul>
        <h2>Total: ${total}</h2>
      </div>
    </div>
  );
};
