const fs = require('fs');

require('strapi')()
  .load()
  .then(() => {
    const models = {};

    Object.keys(strapi.api).forEach(apiName => {
      Object.values(strapi.api[apiName].models || {}).forEach(model => {
        models[model.globalId] = formatModel(model);
      });
    });

    Object.keys(strapi.plugins).forEach(pluginName => {
      Object.values(strapi.plugins[pluginName].models || {}).forEach(model => {
        models[model.globalId] = formatModel(model);
      });
    });

    Object.values(strapi.components).forEach(model => {
      models[model.globalId] = formatModel(model);
    });

    fs.writeFileSync('models.json', JSON.stringify(models, null, 2));
    process.exit(0);
  });

function formatModel(model) {
  return {
    collection: model.collectionName,
    files: Object.keys(model.attributes).reduce((acc, key) => {
      const attr = model.attributes[key];
      if (attr.model === 'file' && attr.plugin === 'upload') {
        acc[key] = 'single';
      }

      if (attr.collection === 'file' && attr.plugin === 'upload') {
        acc[key] = 'multiple';
      }
      return acc;
    }, {}),
  };
}