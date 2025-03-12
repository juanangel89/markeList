import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as idRandom } from "uuid";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [listAddProducts, setListAddProducts] = useState([]); // Estado para productos seleccionados
  const [nameShop, setNameShop] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [brandProduct, setBrandProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [unitProduct, setUnitProduct] = useState("");

  // Estado para almacenar todos los productos (guardado en localStorage)
  const [Products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(Products));
  }, [Products]);

  // Función para CREAR productos nuevos
  const handleCreateProduct = () => {

    const newProduct = {
      id: idRandom(),
      name: nameProduct,
      brand: brandProduct,
      price: priceProduct,
      unit: unitProduct,
      nameShop: nameShop,
      categoryProduct: categoryProduct,
    };

    const updatedProducts = [...Products];
    const shopIndex = updatedProducts.findIndex(shop => shop.name === nameShop);

    if (shopIndex !== -1) {
      const categoryIndex = updatedProducts[shopIndex].categories.findIndex(category => category.name === categoryProduct);
      if (categoryIndex !== -1) {
        updatedProducts[shopIndex].categories[categoryIndex].products.push(newProduct);
      } else {
        updatedProducts[shopIndex].categories.push({
          id: idRandom(),
          name: categoryProduct,
          products: [newProduct],
        });
      }
    } else {
      updatedProducts.push({
        id: idRandom(),
        name: nameShop,
        categories: [
          {
            id: idRandom(),
            name: categoryProduct,
            products: [newProduct],
          },
        ],
      });
    }
    setProducts(updatedProducts);
    setNameShop('');
    setCategoryProduct('');
    setNameProduct('');
    setBrandProduct('');
    setPriceProduct('');
    setUnitProduct('');
  };

    // Función para ACTUALIZAR productos nuevos
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((shop) => {
        if (shop.name === updatedProduct.nameShop) {
          return {
            ...shop,
            categories: shop.categories.map((category) => {
              if (category.name === updatedProduct.categoryProduct) {
                return {
                  ...category,
                  products: category.products.map((product) =>
                    product.name === updatedProduct.nameProduct
                      ? { ...product, ...updatedProduct }
                      : product
                  ),
                };
              }
              return category;
            }),
          };
        }
        return shop;
      })
    );
  }

  // Función para AGREGAR productos a la lista `listAddProducts`
  const handleAddToList = (selectedProduct) => {
    if (!selectedProduct) return;
  
    // Inicializar las variables como undefined para detectar errores más fácilmente
    let shopName;
    let categoryName;
  
    // Buscar la tienda y la categoría en Products
    for (const shop of Products) {
      for (const category of shop.categories) {
        const foundProduct = category.products.find(prod => prod.id === selectedProduct.id);
        if (foundProduct) {
          shopName = shop.name;
          categoryName = category.name;
          break; // Salir del bucle si se encuentra el producto
        }
      }
      if (shopName) break; // Si ya se encontró, salir del bucle principal
    }
  
    // Si no se encontraron, asignar valores por defecto para evitar valores undefined
    shopName = shopName || "Desconocida";
    categoryName = categoryName || "Desconocida";
  
    if (!listAddProducts.some(prod => prod.id === selectedProduct.id)) {
      const newProduct = { 
        ...selectedProduct, 
        id: selectedProduct.id || idRandom(),
        nameShop: shopName, // Ahora aseguramos que tenga un valor
        categoryProduct: categoryName // Ahora aseguramos que tenga un valor
      };
  
      setListAddProducts((prevList) => [...prevList, newProduct]);
      console.log("Producto agregado a la lista:", newProduct);
    }
  };
  
  

  // Función para ELIMINAR un producto de `listAddProducts`
  const handleRemoveFromList = (productId) => {
    setListAddProducts(listAddProducts.filter(product => product.id !== productId));
  };

  return (
    <ProductContext.Provider
      value={{
        handleCreateProduct,
        handleUpdateProduct,
        handleAddToList,
        handleRemoveFromList,
        nameShop, setNameShop,
        categoryProduct, setCategoryProduct,
        nameProduct, setNameProduct,
        brandProduct, setBrandProduct,
        unitProduct, setUnitProduct,
        priceProduct, setPriceProduct,
        Products, setProducts,
        listAddProducts, setListAddProducts, // ✅ Incluir en el contexto
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
