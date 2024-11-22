import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../../services/axios";
import { useCart } from "../context/CartContext";


export default function Home() {

  const [books, setBooks] = useState([])
  const { addBookToCart } = useCart();
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await api.get('/api/livros')
      console.log(response.data)
      setBooks(response.data)
    };
    fetchBooks();
  }, [])


  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 font-poppins">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#64836e]">
          Livros
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={book.imageUrl}
                alt={book.name}
                className="h-32 w-32 object-cover mb-4"
              />
              <h2 className="text-xl font-bold text-[#3e5c48]">{book.name}</h2>
              <p className="text-sm text-gray-400 line-clamp-3">{book.description}</p>
              <p className="text-lg text-gray-600">{`R$ ${book.price}`}</p>
              <p className="text-lg text-gray-600">{book.author}</p>
              <button
                onClick={() => addBookToCart(book)}
                className="mt-4 bg-[#64836e] text-white py-2 px-4 rounded-md hover:bg-[#3e5c48] transition">
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}
