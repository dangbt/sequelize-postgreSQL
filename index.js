const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const { mergeResolvers, mergeTypes, fileLoader } = require('merge-graphql-schemas');

const options = {
    port: 4000,
    endpoint: '/graphql',
    subsciptions: '/subscriptions',
    playground: '/playground',
}

const typeArray = fileLoader(path.join(__dirname, './typeDefs/*'));
const typeDefs = mergeTypes(typeArray);

const resolverArray = fileLoader(path.join(__dirname, './resolvers/*'));
const resolvers = mergeResolvers(resolverArray);

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(options, (options) => console.log(`start port ${options.port}`));