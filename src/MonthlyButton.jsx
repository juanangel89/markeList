import PropTypes from 'prop-types';

export const MonthlyButton = ({setOpenModal}) => {

  return (
    <button className="CreateButton" onClick={
      (event)=>{
        console.log('click crear producto');
        console.log(event.target);
        setOpenModal(state=>!state);
      }}
    >Resumen meses</button>
  );
};

MonthlyButton.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};