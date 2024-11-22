import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../../services/axios';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const userId = user?.id

  //   {
  //     id: "12345",
  //     status: "Concluído",
  //     total: "R$ 150,00",
  //     date: "20/11/2024",
  //   },
  //   {
  //     id: "67890",
  //     status: "Pendente",
  //     total: "R$ 200,00",
  //     date: "18/11/2024",
  //   },
  //   {
  //     id: "11223",
  //     status: "Cancelado",
  //     total: "R$ 100,00",
  //     date: "15/11/2024",
  //   },
  // ];

  useEffect(() => {
    if (!userId) return;
    const fetchOrdersByUserId = async () => {
      const response = await api.get(`/api/pedidos/user/${userId}`)
      console.log(response.data);
      setOrders(response.data.orders);
      console.log("orders", orders)
    }
    fetchOrdersByUserId();
  }, [userId])

  return (
    <div>
      <Navbar />
      <main className="bg-[#f4f8f6] min-h-screen py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#3e5c48] mb-6">
            Meus Pedidos
          </h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">Nenhum pedido encontrado.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-lg p-4 border-l-4 border-[#64836e] hover:shadow-lg transition"
                >
                  <div className="mb-2">
                    <h2 className="text-lg font-bold text-[#3e5c48]">Pedido #{order.id}</h2>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`${order.status === "PAYED"
                        ? "text-green-600"
                        : order.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-red-600"
                        } font-semibold`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Total:</span> {`R$ ${(order.total).toFixed(2)}`}
                  </p>
                  <button className="mt-4 w-full bg-[#64836e] text-white py-2 px-4 rounded-md hover:bg-[#3e5c48] transition">
                    Ver Detalhes
                  </button>
                </div>
              ))
            )}

          </div>
        </div>
      </main>
    </div>
  )
}
