const { result } = require('../schemas/order');
const { User } = require('../schemas/user');
const { Product } = require('../schemas/product');
const Sequelize = require('sequelize');
const { Order, Order_Items } = result;

async function createOrderItems(orderId, products) {
  var promises = [];

  products.forEach(function (product) {
    
    promises.push(Order_Items.create({
      orderId: orderId,
      product_id: product.product,
      quantity: product.quantity,
    }));
  });

  return Sequelize.Promise.all(promises);
}

const reslovers = {
  Order: {
    buyer: async (parent, _) => {
      try {
        debugger
        const user = await User.findById(parent.buyer);
        return user;
      }
      catch (err) {
        console.log('loi rui !! ', err)
      }
    }
  },
  Order_Items: {
    product: async (parent, _) => {
      try {
        debugger
        const product = await Product.findById(parent.product_id)
        debugger
        return product;
        
      } catch (error) {
        console.log('loi rui !!', error)

      }
    },
    order: async (parent, _) => {
      try {
        debugger
        const order = await Order.findById(parent.orderId)
        debugger

        return order;
      } catch (error) {
        console.log('loi rui !!', error)

      }
    }
  },
  newOrder: {
    order: async (parent, _) => {
      try {

        const user = await User.findById(parent.buyer);
        return user;
      }
      catch (err) {
        console.log('loi rui !! ', err)
      }
    },
    product: async (parent, _) => {
      try {
        debugger
        var promises = [];
        parent.product.forEach(function (product) {
          promises.push(Product.findById(product.id))
        });
        const listProduct = Sequelize.Promise.all(promises);
        debugger
        return listProduct;
      }
      catch (err) {
        console.log('loi rui !! ', err)
      }
    }
  },
  Query: {
    order: async (_, { id }) => {
      try {
        const order = await Order.findById(id);
        const orderItems = await Order_Items.findAll({ where: { order_id: id } });
        debugger
        const buyer = order.buyer;
        const product = orderItems.map(item =>   { return {id : item.product_id,quantity:  item.quantity} });
        debugger
        const newItems = {
          buyer,
          product
        }

        return newItems;
      } catch (err) {
        console.log('loi rui !! ', err)
      }
    },
    orders: async () => {
      try {
        const orders = await Order.findAll();
        return orders;
      } catch (err) {
        console.log('loi rui !! ', err)
      }
    },
    orderItems: async () => {
      try {
        const orderItems = await Order_Items.findAll();
        return orderItems;
      } catch (err) {
        console.log('error', err);
      }
    }
  },
  Mutation: {
    createOrder: async (_, args) => {
      try {
        const products = args.products;
        const newOrder = await Order.create({ buyer: args.buyer });
        
        const newOrder_Items = await createOrderItems(newOrder.id, products);
        debugger
        return newOrder_Items;

      } catch (err) {
        console.log('loi rui !! ', err)
      }
    },
    deleteOrder: async (_, args) => {
      try {

         await Order.destroy({where :{id: args.id}});
        const message = 'order is deleted';
        return message;

      } catch (err) {
        console.log('loi rui !! ', err)
      }
    }
  }

}
module.exports = reslovers;