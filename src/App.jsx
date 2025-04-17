import "./App.css";
import { AddProducts } from "./AddProducts";
import { ListProducts } from "./ListProducts";
import { CreateProducts } from "./CreateProducts";
import { CreateButton } from "./CreateButton";
import { EditButton } from "./EditButton";
import { ComparePrices } from "./ComparePrices";
import { CompareButton } from "./CompareButton";
import { MonthlyButton } from "./MonthlyButton";
import { MonthlySummary } from "./MonthlySummary";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "./context/context";
import { Modal } from "./Modal";
import { EditProduct } from "./EditProduct";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./register/firebaseConfig";
import { Login } from "./register/Login";
import { logout } from "./register/AuthService";


function App() {
  const { 
    openCreateModal, setOpenCreateModal, 
    openEditModal, setOpenEditModal, 
    openCompareModal, setOpenCompareModal,
    openMonthlyModal, setMonthlyModal 
  } = useContext(ProductContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Si el usuario no está autenticado, solo muestra el componente Login
  if (!user) {
    return <div className="shop-container"><Login /></div>;
  }

  return (
    <div className="shop-container">
      <h3>Bienvenido, {user.displayName}</h3>
      <button onClick={logout}>Cerrar Sesión</button>
      
      <CreateButton setOpenModal={setOpenCreateModal} />
      {openCreateModal && (
        <Modal>
          <CreateProducts />
        </Modal>
      )}

      <EditButton setOpenModal={setOpenEditModal} />
      {openEditModal && (
        <Modal>
          <EditProduct />
        </Modal>
      )}
      
      <CompareButton setOpenModal={setOpenCompareModal}/>
      {openCompareModal && (
        <Modal>
          <ComparePrices />
        </Modal>
      )}

      <MonthlyButton setOpenModal={setMonthlyModal}/>
      {openMonthlyModal && (
        <Modal>
          <MonthlySummary />
        </Modal>
      )}

      <AddProducts />
      <ListProducts />
    </div>
  );
}

export default App;
