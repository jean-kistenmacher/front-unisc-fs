import Login from "./components/auth/login";
import Register from "./components/auth/register";

import Header from "./components/header";
import Home from "./components/home";
import Movie from "./components/movies";
import Pedidos from "./components/pedidos";
import Checkout from "./components/checkout";

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App () {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registrar",
      element: <Register />,
    },
    {
      path: "/inicio",
      element: <Home />,
    },
    {
      path: "/comprar",
      element: <Movie />,
    },
    {
      path: "/pedidos",
      element: <Pedidos />,
    },
    {
      path: "/checkout/:id",
      element: <Checkout />,
    }
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
