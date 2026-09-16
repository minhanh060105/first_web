import { Order, OrderItem, Product } from '../models/index.js';
import { sequelize } from '../libs/db.js';

class OrderService {
    async createOrder(userId, { items, shippingAddress, note, paymentMethod, shippingMethod }) {
        if (!items || !items.length) throw { statusCode: 400, message: 'Giỏ hàng trống.' };
        if (!shippingAddress) throw { statusCode: 400, message: 'Vui lòng nhập địa chỉ giao hàng.' };

        const validPayments = ['COD', 'BANK', 'MOMO'];
        const validShipping = ['FAST', 'EXPRESS'];
        const payMethod = validPayments.includes(paymentMethod) ? paymentMethod : 'COD';
        const shipMethod = validShipping.includes(shippingMethod) ? shippingMethod : 'FAST';

        const t = await sequelize.transaction();
        try {
            let totalAmount = 0;
            const itemsData = [];
            for (const item of items) {
                const product = await Product.findByPk(item.productId, { transaction: t });
                if (!product || product.status !== 'ACTIVE') throw { statusCode: 400, message: `Sản phẩm không tồn tại.` };
                if (product.stock < item.quantity) throw { statusCode: 400, message: `Sản phẩm "${product.productName}" không đủ hàng.` };
                totalAmount += product.price * item.quantity;
                itemsData.push({ productId: item.productId, quantity: item.quantity, unitPrice: product.price });
                await product.update({ stock: product.stock - item.quantity }, { transaction: t });
            }

            // Tính phí ship trên backend để bảo mật
            let shippingFee = 0;
            if (shipMethod === 'FAST') {
                shippingFee = totalAmount >= 500000 ? 0 : 30000;
            } else if (shipMethod === 'EXPRESS') {
                shippingFee = 50000;
            }

            const finalTotal = totalAmount + shippingFee;

            const order = await Order.create({ 
                userId, 
                totalAmount: finalTotal, 
                shippingAddress, 
                note: note || null,
                paymentMethod: payMethod,
                shippingMethod: shipMethod,
                shippingFee
            }, { transaction: t });

            for (const item of itemsData) {
                await OrderItem.create({ orderId: order.orderId, ...item }, { transaction: t });
            }
            await t.commit();
            return { success: true, message: 'Đặt hàng thành công!', data: { orderId: order.orderId, totalAmount: finalTotal } };
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    async getUserOrders(userId) {
        const orders = await Order.findAll({
            where: { userId },
            include: [{ model: OrderItem, as: 'items', include: [{ model: Product, as: 'product', attributes: ['productName', 'imageUrl'] }] }],
            order: [['createdAt', 'DESC']]
        });
        return { success: true, data: orders };
    }

    async getAllOrders({ limit = 100, offset = 0, status } = {}) {
    const where = {};
    if (status) where.status = status;
    const orders = await Order.findAll({
        where,
        include: [{ model: OrderItem, as: 'items', include: [{ model: Product, as: 'product', attributes: ['productName', 'imageUrl'] }] }],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
    });
    return { success: true, data: orders };
}

    async updateStatus(orderId, status) {
        const order = await Order.findByPk(orderId);
        if (!order) throw { statusCode: 404, message: 'Đơn hàng không tồn tại.' };
        await order.update({ status });
        return { success: true, message: 'Cập nhật trạng thái thành công.', data: order };
    }

    async getStats() {
        const deliveredOrders = await Order.findAll({ where: { status: 'DELIVERED' } });
        const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        const pendingStatuses = ['PENDING', 'CONFIRMED', 'SHIPPING'];
        const pendingOrders = await Order.findAll({ where: { status: pendingStatuses } });
        const pendingRevenue = pendingOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        const totalOrders = await Order.count();
        
        const statuses = ['PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED'];
        const statusCounts = {};
        for (const s of statuses) {
            statusCounts[s] = await Order.count({ where: { status: s } });
        }

        const topSellingItems = await OrderItem.findAll({
            attributes: [
                'productId',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQty'],
                [sequelize.fn('SUM', sequelize.literal('quantity * unit_price')), 'totalRev']
            ],
            group: ['productId'],
            order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
            limit: 5,
            include: [{ model: Product, as: 'product', attributes: ['productName', 'imageUrl'] }]
        });

        return {
            success: true,
            data: {
                totalRevenue,
                pendingRevenue,
                totalOrders,
                statusCounts,
                topProducts: topSellingItems.map(item => ({
                    productId: item.productId,
                    productName: item.product?.productName || 'Sản phẩm đã bị xóa',
                    imageUrl: item.product?.imageUrl || null,
                    totalQty: parseInt(item.getDataValue('totalQty')),
                    totalRev: parseInt(item.getDataValue('totalRev'))
                }))
            }
        };
    }
}

export default new OrderService();

