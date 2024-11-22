// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let formErrors = false;
    if (email.length === 0 || password.length === 0) {
      formErrors = true
      alert("Preencha os campos antes de enviar");
    }
    try {
      //TODO: AJUSTAR PARA RECEBER A FUNCAO DE LOGIN DO CONTEXT
      const response = await api.post("/api/token", {
        email,
        password
      });
      const token = response.data.token;
      const userData = {
        id: response.data.user.id,
        nome: response.data.user.nome,
        email: response.data.user.email,
        role: response.data.user.role
      }

      login(token, userData)
      alert("Logado com sucesso.");
      navigate("/")

    } catch (error) {
      console.error(error)
      alert("Aconteceu algo inesperado. Tente novamente mais tarde.")
    }
    if (formErrors) return;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#64836e]">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
            Entrar
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Não possui uma conta?{" "}
          <a href="/cadastrar" className="text-[#64836e] hover:underline">
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
}
