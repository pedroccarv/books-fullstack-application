import React from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { cartItems } = useCart();


  const totalItems = (cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
    : 0;

  return (
    <nav className="bg-[#64836e] text-white px-6 py-4 shadow-md font-poppins">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-[#b0d1ba] transition">
          Library Life
        </Link>
        <ul className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <li>
                <span className="text-md font-montserrat">
                  Bem-vindo, {user?.nome || "Usuário"}!
                </span>
              </li>
              {user.role === 'admin' ? (
                <li>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to='/pedidos'>
                    <FaClipboardList className="h-8 w-8 text-white hover:text-[#b0d1ba] transition" />
                  </Link>
                </li>
              )}
              <li>
                <Link to="/carrinho" className="relative">
                  <IoCartOutline className="h-8 w-8 text-white hover:text-[#b0d1ba] transition" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-1 bg-white text-[#b0d1ba] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-white text-[#64836e] py-2 px-4 rounded-md hover:bg-[#b0d1ba] hover:text-[#3e5c48] transition"
                >
                  Sair
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-white text-[#64836e] py-2 px-4 rounded-md hover:bg-[#b0d1ba] hover:text-[#3e5c48] transition"
              >
                Entrar
              </Link>
            </li>
          )}
        </ul>
      </div >
    </nav >
  );
}
