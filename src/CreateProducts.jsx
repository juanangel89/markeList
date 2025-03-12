import { useContext } from "react";
import { ProductContext } from "./context/context";
import "./CreateProducts.css";

export const CreateProducts = () => {
  const {
    handleCreateProduct,
    handleUpdateProduct,
    nameShop, setNameShop,
    categoryProduct, setCategoryProduct,
    nameProduct, setNameProduct,
    brandProduct, setBrandProduct,
    unitProduct, setUnitProduct,
    priceProduct, setPriceProduct,
    Products
  } = useContext(ProductContext);

  // Verificar si el producto ya existe para decidir si actualizar o crear
  const productoExistente = Products.find(shop => shop.name === nameShop)
    ?.categories.find(cat => cat.name === categoryProduct)
    ?.products.find(prod => prod.name === nameProduct);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      nameShop,
      categoryProduct,
      nameProduct,
      brand: brandProduct,
      unit: unitProduct,
      price: priceProduct,
    };

    if (productoExistente) {
      handleUpdateProduct(newProduct);
    } else {
      handleCreateProduct(newProduct);
    }
  };

  return (
    <div className="product-container-create-top">
      <h2>{productoExistente ? "Actualizar producto" : "Crear producto"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="container-input-shop-category">
          <div className="container-input">
            <h4>Tienda</h4>
            <input
              type="text"
              placeholder="Ejem: Tienda dona concha"
              className="input"
              onChange={(event) => setNameShop(event.target.value)}
              value={nameShop}
            />
          </div>
          <div className="container-input">
            <h4>Categoría producto</h4>
            <input
              type="text"
              placeholder="Ejem: Tubérculos"
              className="input"
              onChange={(event) => setCategoryProduct(event.target.value)}
              value={categoryProduct}
            />
          </div>
        </div>
        <div className="container-input-product">
          <div className="container-input">
            <h4>Nombre producto</h4>
            <input
              type="text"
              placeholder="Ejem: Papa pastusa"
              className="input"
              onChange={(event) => setNameProduct(event.target.value)}
              value={nameProduct}
            />
          </div>
          <div className="container-input">
            <h4>Marca</h4>
            <input
              type="text"
              placeholder="Ejem: Mister Potato"
              className="input"
              onChange={(event) => setBrandProduct(event.target.value)}
              value={brandProduct}
            />
          </div>
          <div className="container-input">
            <h4>Unidad de medida</h4>
            <select
              className="input"
              value={unitProduct}
              onChange={(e) => setUnitProduct(e.target.value)}
            >
              <option value="">Selecciona una unidad</option>
              <option value="kg">Kilogramos (kg)</option>
              <option value="litros">Litros (L)</option>
              <option value="gramos">Gramos (g)</option>
              <option value="mililitros">Mililitros (ml)</option>
              <option value="unidad">Unidad</option>
            </select>
          </div>
          <div className="container-input">
            <h4>Precio</h4>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="ejemp:1000"
              className="input"
              onChange={(event) => {
                let value = event.target.value;
                if (/^\d*$/.test(value)) {
                  setPriceProduct(value === "" ? "" : Number(value));
                }
              }}
              value={priceProduct}
            />
          </div>
        </div>
        {/* Botón dinámico: "Actualizar" si el producto existe, "Crear" si no */}
        <button type="submit">
          {productoExistente ? "Actualizar producto" : "Crear producto"}
        </button>
      </form>
      <button onClick={() => localStorage.removeItem("products")}>
        Limpiar local storage
      </button>
      <p>Para actualizar datos del producto se debe llenar los campos Tienda, categoria y producto para modificar los datos marca,unidad y precio</p>
    </div>
  );
};
