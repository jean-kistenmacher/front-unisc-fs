// Import das funções do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configurações da WebApp do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCsTX0llxsEx3Vz03tDxaga2LOowchPQqw",
  authDomain: "unisc-fabrica-software.firebaseapp.com",
  projectId: "unisc-fabrica-software",
  storageBucket: "unisc-fabrica-software.appspot.com",
  messagingSenderId: "498212189019",
  appId: "1:498212189019:web:3356bbdc0740cf0f60a07e",
  measurementId: "G-VJ6JNDDML1"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export { app, auth };
