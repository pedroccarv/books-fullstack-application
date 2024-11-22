import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import api from '../../services/axios';

export default function Admin() {

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editingBookId, setEditingBookId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('/api/categorias');
      console.log(response.data)

      setCategories(response.data);
    }
    const fetchBooks = async () => {
      const response = await api.get('/api/livros');
      console.log("books", response.data)
      setBooks(response.data)
    }
    fetchCategories()
    fetchBooks()
  }, [])

  const handleEditBook = async (e, id) => {
    e.preventDefault();
    try {
      const response = await api.put(`/api/livros/${id}`, {
        name: productName,
        price,
        description,
        stockQuantity: stock,
        imageUrl,
        author,
        category_id: categoryId,
      });

      if (response.status === 200) {
        alert("Produto atualizado com sucesso!");
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === id ? { ...book, ...response.data } : book
          )
        );
        setProductName("");
        setPrice("");
        setDescription("");
        setStock("");
        setImageUrl("");
        setAuthor("");
        setCategoryId("");
        setEditingBookId(null);
      }
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
    }
  };
  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/api/livros/${id}`);
      alert("Deletado com sucesso");
    } catch (error) {
      console.log(error);
    }

  }


  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/livros', {
        name: productName,
        price,
        description,
        stockQuantity: stock,
        imageUrl,
        author,
        category_id: categoryId
      });
      if (response.status === 201) {
        setSuccessMessage('Produto criado com sucesso!');
        setProductName('');
        setPrice('');
        setDescription('');
        setStock('');
        setImageUrl('')
        setAuthor('')
      }
    } catch (error) {
      console.error(error)
      errorMessage("Erro ao criar produto");
    }
  }

  return (
    <div>
      <Navbar />
      <main className="bg-[#f4f8f6] min-h-screen py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#3e5c48] mb-6">
            Cadastrar Livro
          </h1>
          <form
            className="bg-white shadow-md rounded-lg p-6"
            onSubmit={handleCreateBook}
          >
            {successMessage && (
              <div className="mb-4 text-green-600 font-semibold">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-600 font-semibold">
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome do livro
              </label>
              <input
                type="text"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Autor
              </label>
              <input
                type="text"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Preço
              </label>
              <input
                type="number"
                step="0.01"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Url da imagem
              </label>
              <input
                type="text"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Estoque
              </label>
              <input
                type="number"
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Categoria
              </label>
              <select
                className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
                value={categoryId}
                onChange={(e) => {
                  console.log('Categoria selecionada (id):', e.target.value); // Confirme o valor selecionado
                  setCategoryId(e.target.value);
                }}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#64836e] text-white py-2 px-4 rounded-md hover:bg-[#3e5c48] transition"
            >
              Cadastrar
            </button>
          </form>
        </div>
        {/* SECAO PARA LISTAR OS PRODUTOS EXISTENTES */}
        <section className="mt-6">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  {editingBookId === book.id ? (
                    // Formulário de Edição
                    <form onSubmit={(e) => handleEditBook(e, book.id)}>
                      <input
                        type="text"
                        placeholder="Nome do Produto"
                        className="mb-2 w-full border p-2 rounded"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Autor"
                        className="mb-2 w-full border p-2 rounded"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Preço"
                        className="mb-2 w-full border p-2 rounded"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <textarea
                        placeholder="Descrição"
                        className="mb-2 w-full border p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                      <input
                        type="number"
                        placeholder="Estoque"
                        className="mb-2 w-full border p-2 rounded"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="URL da Imagem"
                        className="mb-2 w-full border p-2 rounded"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                      />
                      <select
                        className="mb-2 w-full border p-2 rounded"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="w-full bg-[#3e5c48] text-white py-2 px-4 rounded-md hover:bg-[#5c876b]"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingBookId(null)}
                        className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                      >
                        Cancelar
                      </button>
                    </form>
                  ) : (
                    // Exibição Normal
                    <>
                      <img
                        src={book.imageUrl}
                        alt={book.name}
                        className="h-32 w-32 object-cover mb-4"
                      />
                      <h2 className="text-xl font-bold text-[#3e5c48]">
                        {book.name}
                      </h2>
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {book.description}
                      </p>
                      <p className="text-lg text-gray-600">{`R$ ${book.price}`}</p>
                      <p className="text-lg text-gray-600">{book.author}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingBookId(book.id);
                            setProductName(book.name);
                            setPrice(book.price);
                            setDescription(book.description);
                            setStock(book.stockQuantity);
                            setImageUrl(book.imageUrl);
                            setAuthor(book.author);
                            setCategoryId(book.category_id);
                          }}
                          className="mt-4 bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}