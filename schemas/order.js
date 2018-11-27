const { STRING, DATE, INTEGER } = require('sequelize');;
const sequelize = require('../sequelize');

const Order = sequelize.define('orders', {
   buyer: {
       type: INTEGER,
       references: {
           model: "users",
           key: "id",
           deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE

       }
   },
    createdAt: {
        type: DATE
    },
    updatedAt: {
        type: DATE
    }
});

const Order_Items = sequelize.define('order_items',{
    product_id: {
        type: INTEGER,
        references: {
            model: "products",
            key: "id",
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    quantity: {
        type: INTEGER
    },
    createdAt: { type: DATE },
    updatedAt: { type: DATE }
})

Order_Items.belongsTo(Order, {
    foreignKey: 'orderId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
})

const result = {
    Order,
    Order_Items
}
module.exports.result = result;