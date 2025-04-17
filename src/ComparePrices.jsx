import { useContext } from "react";
import { ProductContext } from "./context/context";

export const ComparePrices = () => {
  const { listAddProducts,setOpenCompareModal } = useContext(ProductContext);

  const groupedByProduct = {};

  const onCancel = () => {
    setOpenCompareModal(false);
  };


  listAddProducts.forEach(prod => {
    const key = prod.name;
    if (!groupedByProduct[key]) groupedByProduct[key] = [];
    groupedByProduct[key].push(prod);
  });

  return (
    <div className="product-container-create">
      <h2>Comparar precios por producto y mes</h2>
      {Object.entries(groupedByProduct).map(([name, items]) => {
        const pricesByMonth = {};
        items.forEach(item => {
          const month = item.monthAdded || "Fecha desconocida";
          if (!pricesByMonth[month]) pricesByMonth[month] = [];
          pricesByMonth[month].push(Number(item.price));
        });

        return (
          <div key={name}>
            <h4>{name}</h4>
            <ul>
              {Object.entries(pricesByMonth).map(([month, prices]) => (
                <li key={month}>
                  {month}: Promedio ${(
                    prices.reduce((a, b) => a + b, 0) / prices.length
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
            <button type="button" className="button-cancel" onClick={onCancel}>
        Cerrar
        </button>
    </div>
  );
};
