import PropTypes from 'prop-types';

export const EditButton = ({setOpenModal}) => {

  return (
    <button className="CreateButton" onClick={
      (event)=>{
        console.log('click editar producto');
        console.log(event.target);
        setOpenModal(state=>!state);
      }}
    >Editar Producto</button>
  );
};

EditButton.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};