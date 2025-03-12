import "./App.css";
import { AddProducts } from "./AddProducts";
import { ListProducts } from "./ListProducts";
import { CreateProducts } from "./CreateProducts";

function App() {
  return (
    <div className="shop-container">
      <CreateProducts></CreateProducts>

      <AddProducts></AddProducts>
      <ListProducts></ListProducts>

    </div>
  );
}

export default App;
