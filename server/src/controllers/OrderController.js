const { Order, OrderBook, Book } = require('../../models');

class OrderController {
    async createOrder(req, res) {
        try {
            const { user_id, books } = req.body;
            let total = 0;
            const order = await Order.create({ user_id, total: 0 });

            for (const book of books) {
                console.log(book)
                const foundBook = await Book.findByPk(book.book_id);
                if (!foundBook) {
                    return res.status(404).json({ error: `Livro com ID ${book.book_id} não encontrado.` });
                }

                const itemTotal = foundBook.price * book.quantity;
                total += itemTotal;

                await OrderBook.create({
                    order_id: order.id,
                    book_id: foundBook.id,
                    price: foundBook.price,
                    quantity: book.quantity
                });
            }
            await order.update({ total });
            return res.status(201).json({
                status: 201,
                message: "Pedido criado com sucesso.",
                order
            });
        } catch (error) {
            console.error("Erro ao processar o pedido", error);
            return res.status(500).json({ erro: "Erro ao criar o pedido" });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: OrderBook,
                        as: 'orderBooks',
                    },
                ],
            });
            return res.status(200).json({ orders });
        } catch (error) {
            console.error('Erro ao listar pedidos:', error);
            return res.status(500).json({ error: 'Erro ao listar os pedidos.' });
        }
    }

    async getUserOrders(req, res) {
        try {
            const { user_id } = req.params;
            const orders = await Order.findAll({
                where: { user_id },
                include: [
                    {
                        model: OrderBook,
                        as: 'orderBooks',
                    },
                ],
            });

            return res.status(200).json({ orders });
        } catch (error) {
            console.error('Erro ao listar pedidos do usuário:', error);
            return res.status(500).json({ error: 'Erro ao listar os pedidos do usuário.' });
        }
    }

    async getOrderById(req, res) {
        try {
            const { id } = req.params;

            const order = await Order.findByPk(id, {
                include: [
                    {
                        model: OrderBook,
                        as: 'orderBooks',
                    },
                ],
            });

            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            return res.status(200).json({ order });
        } catch (error) {
            console.error('Erro ao obter pedido:', error);
            return res.status(500).json({ error: 'Erro ao buscar o pedido.' });
        }
    }
    async updateOrder(req, res) {
        try {
            const { id } = req.params;

            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            const updatedOrder = await order.update(req.body);

            return res.status(200).json({
                status: 200,
                message: 'Pedido atualizado com sucesso.',
                order: updatedOrder,
            });
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            return res.status(500).json({ error: 'Erro ao atualizar o pedido.' });
        }
    }

    async confirmOrderPayment(req, res) {
        try {
            const { sessionId } = req.body;
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            const orderId = session.metadata?.orderId;
            console.log("orderId: ", orderId)
            if (!orderId) {
                return res.status(400).json({ message: "Order ID não encontrado na metadata" });
            }

            if (session.payment_status === 'paid') {
                await Order.update({ status: 'pago' }, { where: { id: orderId } });
                return res.status(200).json({ message: "Pagamento confirmado com sucesso" });
            } else {
                return res.status(400).json({ message: "Pagamento não efetuado" });
            }
        } catch (error) {
            console.error("Erro ao confirmar pagamento:", error);
            return res.status(500).json({ erro: "Erro ao confirmar pagamento" });
        }
    }
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;

            const order = await Order.findByPk(id);
            if (!order) {
                return res.status(404).json({ error: 'Pedido não encontrado.' });
            }

            await OrderBook.destroy({ where: { orderId: id } }); // Deletar os OrderBooks relacionados
            await order.destroy(); // Deletar o pedido

            return res.status(200).json({ message: 'Pedido deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            return res.status(500).json({ error: 'Erro ao deletar o pedido.' });
        }
    }
}


module.exports = new OrderController();