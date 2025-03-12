import { useContext } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "./context/context";

export const DeleteIcon = ({ productId }) => {
  const { deleteProduct } = useContext(ProductContext);

  return (
    <span className="delete-icon" onClick={() => deleteProduct(productId)}>
      X
    </span>
  );
};

DeleteIcon.propTypes = {
  productId: PropTypes.string.isRequired, // id debe ser string
};