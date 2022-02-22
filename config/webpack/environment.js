const {environment} = require('@rails/webpacker');

const {graphql, less, moduleLess, svg} = require('./loaders');

environment.loaders.append('graphql', graphql);
environment.loaders.append('less', less);
environment.loaders.append('svg', svg);
environment.loaders.append('less.module', moduleLess);

module.exports = environment;
