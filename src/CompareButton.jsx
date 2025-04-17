import PropTypes from 'prop-types';

export const CompareButton = ({setOpenModal}) => {

  return (
    <button className="CreateButton" onClick={
      (event)=>{
        console.log('click comparar boton');
        console.log(event.target);
        setOpenModal(state=>!state);
      }}
    >Comparar productos</button>
  );
};

CompareButton.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};