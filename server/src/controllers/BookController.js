const { Book } = require("../../models");

class BookController {
    async createBook(req, res) {
        try {
            const newBook = req.body;
            const { name, description, author, price, stockQuantity, imageUrl, category_id } = newBook;
            const book = await Book.create({
                name,
                description,
                author,
                price,
                stockQuantity,
                imageUrl,
                category_id
            });
            res.status(201).json(book);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao criar o livro" });
        }
    }
    async getAllBooks(req, res) {
        try {
            const books = await Book.findAll();
            res.status(200).json(books);
        } catch (error) {
            console.log(error);
            res.status(500).json({ erro: "Erro ao listar os Livros" });
        }
    }
    async getBookById(req, res) {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }
            res.status(200).json(book);
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao mostar o Livro" });
        }
    }
    async updateBook(req, res) {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }
            const newData = await book.update(req.body);
            const { name, description, author, price, stockQuantity, imageUrl, category_id } = newData;
            res.status(200).json({ name, description, author, price, stockQuantity, imageUrl, category_id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao editar o Livro" });
        }
    }
    async deleteBook(req, res) {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) {
                return res.status(500).json({ erro: "Livro não encontrado" });
            }
            await book.destroy()
            res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (error) {
            console.log(error)
            res.status(500).json({ erro: "Erro ao deletar Livro" });
        }

    }
}

module.exports = new BookController();