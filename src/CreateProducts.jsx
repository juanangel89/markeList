import { useContext } from "react";
import { ProductContext } from "./context/context";
import "./CreateProducts.css";

export const CreateProducts = () => {
  const {
    handleCreateProduct,
    nameShop, setNameShop,
    categoryProduct, setCategoryProduct,
    nameProduct, setNameProduct,
    brandProduct, setBrandProduct,
    unitProduct, setUnitProduct,
    priceProduct, setPriceProduct,
    setOpenCreateModal
  } = useContext(ProductContext);

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

    handleCreateProduct(newProduct);

    // Limpiar los campos después de agregar el producto
    setNameShop("");
    setCategoryProduct("");
    setNameProduct("");
    setBrandProduct("");
    setUnitProduct("");
    setPriceProduct("");
  };

  const onCancel = () => {
    setOpenCreateModal(false);
  };

  return (
    <div className="product-container-create">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="container-input">
          <h4>Tienda</h4>
          <input
            type="text"
            placeholder="Ej: Tienda dona concha"
            className="input"
            value={nameShop}
            onChange={(e) => setNameShop(e.target.value)}
          />
        </div>
        <div className="container-input">
          <h4>Categoría</h4>
          <input
            type="text"
            placeholder="Ej: Tubérculos"
            className="input"
            value={categoryProduct}
            onChange={(e) => setCategoryProduct(e.target.value)}
          />
        </div>
        <div className="container-input">
          <h4>Nombre Producto</h4>
          <input
            type="text"
            placeholder="Ej: Papa pastusa"
            className="input"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </div>
        <div className="container-input">
          <h4>Marca</h4>
          <input
            type="text"
            placeholder="Ej: Mister Potato"
            className="input"
            value={brandProduct}
            onChange={(e) => setBrandProduct(e.target.value)}
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
            placeholder="Ej: 1000"
            className="input"
            value={priceProduct}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPriceProduct(value === "" ? "" : Number(value));
              }
            }}
          />
        </div>
        <button type="submit">Crear producto</button>
        <button type="button" className="button-cancel" onClick={onCancel}>
        Cerrar
        </button>
      </form>
    </div>
  );
};
