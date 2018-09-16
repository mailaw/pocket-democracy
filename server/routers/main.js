const IBMCloudEnv = require('ibm-cloud-env');
const bodyParser = require('body-parser');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
const queryBuilder = require('../../query-builder');
const vcapServices = require('vcap_services');
const fs = require('fs');

const NEWS_ENVIRONMENT_ID = 'system';
const NEWS_COLLECTION_ID = 'news-en';

const credsFromEnv = vcapServices.getCredentials('discovery');
if (credsFromEnv.apikey) {
  credsFromEnv['iam_apikey'] = credsFromEnv.apikey;
}

const params = Object.assign({ version: '2018-03-05' }, fs.existsSync('server/localdev-config.json') ?
  vcapServices.getCredentialsForStarter('discovery', require('./../localdev-config.json')) :
  vcapServices.getCredentialsForStarter('discovery'));

const discovery = new DiscoveryV1(params);

function getWidgetQuery(request) {
  const widgetQueries = request.query.widgetQueries;
   if (!widgetQueries) {
    return null;
  }
   return widgetQueries.split(',').reduce((widgetQuery, finalWidgetQuery) => {
    const queryBuilderWidgetQuery = queryBuilder.widgetQueries[widgetQuery];
     if (queryBuilderWidgetQuery) {
      const widgetAggregations = queryBuilderWidgetQuery.aggregations;
       if (widgetAggregations) {
        const currentAggregations = finalWidgetQuery.aggregations || [];
        delete queryBuilderWidgetQuery.aggregations;
         return Object.assign({}, finalWidgetQuery, queryBuilderWidgetQuery, {
          aggregations: currentAggregations.concat(widgetAggregations),
        });
      }
    }
    return Object.assign({}, finalWidgetQuery, queryBuilderWidgetQuery);
  }, {});
}

module.exports = function(app) {
  app.use(bodyParser.json());

  // setup query endpoint for news
  app.post('/api/query', (req, res, next) => {
    
    const queryParams = queryBuilder.build(req.body);

    if (queryParams.aggregations) {
      queryParams.aggregation = `[${queryParams.aggregations.join(',')}]`;
      delete queryParams.aggregations;
    }

    const params = Object.assign({},  queryParams, {
      environment_id: NEWS_ENVIRONMENT_ID,
      collection_id: NEWS_COLLECTION_ID,
      count: 3
    });

    delete discovery._options.jar; // clear the cookies before querying discovery
    discovery.query(params, (err, response) => {
      if (err) {
        const error = {
          code: err.code || 500,
          error: err.error || err.message,
        };
        return res.status(error.code).json(error);
      } else {
        return res.json(response);
      }
    });
  });
}
