const { User } = require('../schemas/user');

const resolvers = {
    Query: {
        user: async (_, { id }) => {
            try {
                const user = await User.findById(id);
                return user;
            } catch (error) {
                console.log(`${__dirname}/query/user`, error)
            }
        },
        users: async () => {
            try {
                const users = await User.findAll();
                return users;
            } catch (error) {
                console.log(`${__dirname}/query/user`, error)
            }
        }
      ,
    },
    Mutation: {
        createUser: async (_, args) => {
            try {
                const newUser = await User.create({
                    id: args.id,
                    username: args.username,
                    password: args.password,
                })
                return newUser;
            } catch (error) {
                console.log(`${__dirname}/mutation/user`, error)
            }
        }
    }
}
module.exports = resolvers;