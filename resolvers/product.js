const { Product } = require('../schemas/product');

const resolvers = {
    Query: {
        product: async (_, { id }) => {
            try {
                const product = await Product.findById(id);
                return product;
            } catch (error) {
                console.log(`${__dirname}/query/user`, error)
            }
        },
        products: async () => {
            try {
                const products = await Product.findAll({order:['id'],});
                return products;
            } catch (error) {
                console.log(`${__dirname}/query/user`, error)
            }
        }
      ,
    },
    Mutation: {
        addProduct: async (_, args) => {
            try {
                const newProduct = await Product.create({
                    name: args.name,
                    price: args.price
                })
                return newProduct;
            } catch (error) {
                console.log(`${__dirname}/mutation/product`, error)
            }
        },
        updateProduct: async (_, args) => {
            try {
                const updateProduct = await product.update({name: args.name}, {where: {id: args.id}} )
                .then(() =>
                     product.findById(args.id)
                     .then((product) => {
                         return product
                     })
                  )
                .catch(err =>
                    console.log(err)
                );
                return updateProduct;
            } catch(err) {
                console.log(`${__dirname}/mutation/product`. err);
            }
        }
    }
}
module.exports = resolvers;