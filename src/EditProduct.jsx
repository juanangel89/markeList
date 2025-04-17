import { useContext, useState } from "react";
import { ProductContext } from "./context/context";
import "./EditProduct.css";

export const EditProduct = () => {
  const {
    handleUpdateProduct,
    Products,
    nameShop,
    setNameShop,
    categoryProduct,
    setCategoryProduct,
    nameProduct,
    setNameProduct,
    brandProduct,
    setBrandProduct,
    unitProduct,
    setUnitProduct,
    priceProduct,
    setPriceProduct,
    setOpenEditModal,
  } = useContext(ProductContext);

  const [productId, setProductId] = useState("");

  // Obtener tiendas disponibles
  const availableShops = [...new Set(Products.map((shop) => shop.name))];

  // Obtener categorías basadas en la tienda seleccionada
  const availableCategories = nameShop
    ? Products.find((shop) => shop.name === nameShop)?.categories.map(
        (cat) => cat.name
      ) || []
    : [];

  // Obtener productos basados en la categoría seleccionada
  const availableProducts =
    nameShop && categoryProduct
      ? Products.find((shop) => shop.name === nameShop)?.categories.find(
          (cat) => cat.name === categoryProduct
        )?.products || []
      : [];

  // Manejar selección de tienda
  const handleSelectShop = (shopName) => {
    setNameShop(shopName);
    setCategoryProduct(""); // Reiniciar categoría
    setNameProduct(""); // Reiniciar producto seleccionado
  };

  // Manejar selección de categoría
  const handleSelectCategory = (categoryName) => {
    setCategoryProduct(categoryName);
    setNameProduct(""); // Reiniciar producto seleccionado
  };

  // Manejar selección de producto
  const handleSelectProduct = (productId) => {
    const selectedProduct = availableProducts.find(
      (prod) => prod.id === productId
    );
    console.log("Producto seleccionado:", selectedProduct);

    if (selectedProduct) {
      setProductId(selectedProduct.id);
      setNameProduct(selectedProduct.name);
      setBrandProduct(selectedProduct.brand);
      setUnitProduct(selectedProduct.unit);
      setPriceProduct(selectedProduct.price);
    } else {
      console.log("❌ Producto no encontrado con id:", productId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!productId) {
      console.error("❌ No hay un producto seleccionado.");
      return;
    }
  
    // Buscar el producto original basado en su ID
    const selectedProduct = availableProducts.find(prod => prod.id === productId);
    
    if (!selectedProduct) {
      console.error("❌ Producto no encontrado con ID:", productId);
      return;
    }
  
    // Crear objeto actualizado con la misma ID
    const updatedProduct = {
      id: selectedProduct.id, // Mantener el ID original
      nameShop,
      categoryProduct,
      name: nameProduct, // ✅ Asegurar que se usa la variable correcta
      brand: brandProduct,
      unit: unitProduct,
      price: priceProduct,
    };
  
    console.log("✅ Producto actualizado:", updatedProduct); // Verifica que el nombre está cambiando
    handleUpdateProduct(updatedProduct);
  };
  

  const onCancel = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="product-container-edit">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {/* Selección de Tienda */}
        <div className="container-input">
          <h4>Tienda</h4>
          <select
            className="input"
            value={nameShop}
            onChange={(e) => handleSelectShop(e.target.value)}
          >
            <option value="">Selecciona una tienda</option>
            {availableShops.map((shop, index) => (
              <option key={index} value={shop}>
                {shop}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Categoría */}
        <div className="container-input">
          <h4>Categoría</h4>
          <select
            className="input"
            value={categoryProduct}
            onChange={(e) => handleSelectCategory(e.target.value)}
            disabled={!nameShop}
          >
            <option value="">Selecciona una categoría</option>
            {availableCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Producto */}
        <div className="container-input">
          <h4>Producto</h4>
          <select
            className="input"
            value={nameProduct}
            onChange={(e) => handleSelectProduct(e.target.value)}
            disabled={!categoryProduct}
          >
            <option value="">Selecciona un producto</option>
            {availableProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.brand} - {product.unit} - $
                {product.price}
              </option>
            ))}
          </select>
        </div>

        {/* Inputs Editables */}
        <div className="container-input">
          <h4>Nombre Producto</h4>
          <input
            type="text"
            className="input"
            value={nameProduct || ""}
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </div>

        <div className="container-input">
          <h4>Marca</h4>
          <input
            type="text"
            className="input"
            value={brandProduct || ""}
            onChange={(e) => setBrandProduct(e.target.value)}
          />
        </div>

        <div className="container-input">
          <h4>Unidad de medida</h4>
          <select
            className="input"
            value={unitProduct || ""}
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
            className="input"
            value={priceProduct || ""}
            onChange={(e) => setPriceProduct(e.target.value)}
          />
        </div>

        <button type="submit">Actualizar Producto</button>
        <button type="button" className="button-cancel" onClick={onCancel}>
          Cerrar
        </button>
      </form>
    </div>
  );
};
