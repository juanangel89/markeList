import { signInWithGoogle, signInWithGitHub, signInWithFacebook } from "./AuthService";
import "./Login.css";

export const Login = () => {
  return (
    <div className="login-container">
      <h2>Lista de productos para mercado</h2>
      <div className="login-buttons">
      <h2>Iniciar Sesión</h2>
      <button onClick={signInWithGoogle}>Iniciar con Google</button>
      <button onClick={signInWithGitHub}>Iniciar con GitHub</button>
      <button onClick={signInWithFacebook}>Iniciar con Facebook</button>
      {/* <button onClick={logout}>Cerrar Sesión</button> */}
      </div>
    </div>
  );
};
