import React, { useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    let formErrors = false;
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      formErrors = true
      alert("Preencha os campos antes de enviar");
    }
    if (formErrors) return;
    try {
      const response = await api.post('/api/users', {
        username,
        email,
        password
      });
      alert("Cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.log(error)
      alert("Aconteceu algo inesperado. Tente novamente mais tarde.")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#64836e]">
          Crie sua conta
        </h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#64836e]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#64836e]"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#64836e]"
          />
          <button
            type="submit"
            className="w-full bg-[#64836e] text-white py-3 rounded-md hover:bg-[#3e5c48] transition"
          >
            Registrar
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Já possui uma conta?{" "}
          <a href="/login" className="text-[#64836e] hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
