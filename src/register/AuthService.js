import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "./firebaseConfig";

// Función para iniciar sesión con Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Usuario autenticado:", result.user);
  } catch (error) {
    console.error("Error en autenticación con Google:", error);
  }
};

// Función para iniciar sesión con GitHub
export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    console.log("Usuario autenticado:", result.user);
  } catch (error) {
    console.error("Error en autenticación con GitHub:", error);
  }
};

// // Función para iniciar sesión con Facebook
// export const signInWithFacebook = async () => {
//   try {
//     const result = await signInWithPopup(auth, facebookProvider);
//     console.log("Usuario autenticado:", result.user);
//   } catch (error) {
//     console.error("Error en autenticación con Facebook:", error);
//   }
// };

// Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
