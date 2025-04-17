import { useContext } from "react";
import { ProductContext } from "./context/context";

export const MonthlySummary = () => {
  const { listAddProducts,setMonthlyModal } = useContext(ProductContext);

  const totalsByMonth = {};

  const onCancel = () => {
    setMonthlyModal(false);
  };

  listAddProducts.forEach(prod => {
    const month = prod.monthAdded || "Fecha desconocida";
    if (!totalsByMonth[month]) totalsByMonth[month] = 0;
    totalsByMonth[month] += Number(prod.price);
  });

  return (
    <div className="product-container-create">
      <h2>Resumen de gastos por mes</h2>
      <ul>
        {Object.entries(totalsByMonth).map(([month, total]) => (
          <li key={month}>
            {month}: ${total.toFixed(2)}
          </li>
        ))}
      </ul>
      <button type="button" className="button-cancel" onClick={onCancel}>
        Cerrar
        </button>
    </div>
  );
};
