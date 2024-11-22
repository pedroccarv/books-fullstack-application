import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import api from "../../services/axios";
import { useAuth } from "../context/AuthContext";


export default function Cart() {
  const { cartItems, removeItemFromCart, clearCartItems, getTotalPrice } = useCart();
  const { user } = useAuth()
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePurchase = async () => {
    const orderPayload = {
      user_id: user.id,
      books: cartItems.map((item) => ({
        book_id: item.id,
        quantity: item.quantity
      })),
    }
    try {
      const response = await api.post('/api/pedidos', orderPayload)
      clearCartItems();
      alert("Compra realizada com sucesso!");
    } catch (error) {
      console.error(error)
      alert("Erro ao realizar a compra. Tente novamente");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#64836e]">
          Seu Carrinho
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-4 items-center flex justify-center">
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center">
                <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-32 w-32 object-cover mb-4"
                      />
                      <h2 className="text-xl font-bold text-[#3e5c48]">{item.name}</h2>
                      <p className="text-lg text-gray-600">{`R$ ${item.price}`}</p>
                      <p className="text-sm text-gray-400">Quantidade: {item.quantity}</p>
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-[#3e5c48]">
                    Total: R$ {getTotalPrice().toFixed(2)}
                  </h2>
                  <button
                    onClick={clearCartItems}
                    className="mt-4 bg-[#64836e] text-white py-2 px-6 rounded-md hover:bg-[#3e5c48] transition"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold text-[#3e5c48] mb-4">
              Resumo do Pedido
            </h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span className="font-semibold">R$ {total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-[#64836e]">
              <span>Total:</span>
              <span>R$ {(total).toFixed(2)}</span>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full bg-[#64836e] text-white py-3 rounded-md mt-4 hover:bg-[#3e5c48] transition">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
