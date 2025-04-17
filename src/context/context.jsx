import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as idRandom } from "uuid";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [listAddProducts, setListAddProducts] = useState([]); // State to selected products
  const [nameShop, setNameShop] = useState("");
  const [categoryProduct, setCategoryProduct] = useState("");
  const [brandProduct, setBrandProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [unitProduct, setUnitProduct] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCompareModal, setOpenCompareModal] = useState(false);
  const [openMonthlyModal, setMonthlyModal] = useState(false);


  // State to storage all products (to localStorage)
  const [Products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(Products));
  }, [Products]);

  // Function to CREATE products
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

    // fUNCTION to UPDATE products
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
                      product.id === updatedProduct.id // Search for the product by ID
                        ? { ...product, ...updatedProduct } // Update the product
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
    };
    
      // when the component mounts, load the listAddProducts from localStorage
  // and set it to the state `listAddProducts`
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("listAddProducts")) || [];
    setListAddProducts(storedProducts);
  }, []);

  // Function to ADD products to the list `listAddProducts`
  const handleAddToList = (selectedProduct) => {
    if (!selectedProduct) return;
    let shopName;
    let categoryName;
    // Search for the shop and category names in the Products array
    // Iterate through the Products array to find the shop and category names
    for (const shop of Products) {
      for (const category of shop.categories) {
        const foundProduct = category.products.find(prod => prod.id === selectedProduct.id);
        if (foundProduct) {
          shopName = shop.name;
          categoryName = category.name;
          break;
        }
      }
      if (shopName) break;
    }
    shopName = shopName || "Desconocida";
    categoryName = categoryName || "Desconocida";
    // if the product is already in the list, do not add it again
    // Check if the product is already in the list
    if (!listAddProducts.some(prod => prod.id === selectedProduct.id)) {
      const newProduct = { 
        ...selectedProduct, 
        id: selectedProduct.id || idRandom(),
        nameShop: shopName,
        categoryProduct: categoryName,
        dateAdded: new Date().toLocaleString(),
        monthAdded: new Date().toISOString().slice(0, 7) // new field to group by month
      };
      setListAddProducts((prevList) => {
        const updatedList = [...prevList, newProduct];
        // Save the updated list to localStorage
        // Check if listAddProducts exists in localStorage
        localStorage.setItem("listAddProducts", JSON.stringify(updatedList));
        console.log("🗂️ Lista de productos actualizada:", updatedList);
        return updatedList;
      });
      console.log("✅ Producto agregado a la lista:", newProduct);
      console.log("🕒 Fecha de agregado:", newProduct.dateAdded);
    }
  };
  
  

  // Function to eliminate product to `listAddProducts`
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
        listAddProducts, setListAddProducts,
        openCreateModal, setOpenCreateModal,
        openEditModal, setOpenEditModal,
        openCompareModal, setOpenCompareModal,
        openMonthlyModal, setMonthlyModal
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
