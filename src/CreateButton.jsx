import PropTypes from 'prop-types';

export const CreateButton = ({setOpenModal}) => {

  return (
    <button className="CreateButton" onClick={
      (event)=>{
        console.log('click crear producto');
        console.log(event.target);
        setOpenModal(state=>!state);
      }}
    >Crear Producto</button>
  );
};

CreateButton.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};