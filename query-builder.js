const moment = require('moment');
const { fields } = require('./views/fields');
const TopStoriesQuery = require('./views/TopStories/query');
const TopEntitiesQuery = require('./views/TopEntities/query');
const SentimentAnalysisQuery = require('./views/SentimentAnalysis/query');
const MentionsAndSentimentsQuery = require('./views/MentionsAndSentiments/query');
const AnomalyDetectionQuery = require('./views/AnomalyDetection/query');
// ISO 8601 date format accepted by the service
const ISO_8601 = 'YYYY-MM-DDThh:mm:ssZZ';

module.exports = {
  widgetQueries: {
    topStories: TopStoriesQuery,
    topEntities: TopEntitiesQuery,
    SentimentAnalysis: SentimentAnalysisQuery,
    mentionsAndSentiments: MentionsAndSentimentsQuery,
    anomalyDetection: AnomalyDetectionQuery
  },
  build(query) {
    const params = {
      query: `${query.text},${fields.language}:(english|en)`,
    };
    if (query.date) {
      params.filter = `${fields.publication_date}>${moment(query.date.from).format(ISO_8601)},${fields.publication_date}<${moment(query.date.to).format(ISO_8601)}`;
    }
    if (query.sort) {
      params.sort = query.sort === 'date' ? `-${fields.publication_date},-_score` : '-_score';
    }
  //  if (widgetQuery) {
    //  return Object.assign({}, params, widgetQuery);
  //  }

    // do a full query
    const allWidgetAggregations = [].concat(
      TopEntitiesQuery.aggregations,
      SentimentAnalysisQuery.aggregations,
      MentionsAndSentimentsQuery.aggregations,
      // eslint-disable-next-line comma-dangle
      AnomalyDetectionQuery.aggregations
    );
    params.aggregation = `[${allWidgetAggregations.join(',')}]`;
    // add in TopStoriesQuery since it is the only one without aggregations
    return Object.assign({}, params, TopStoriesQuery);
  },
};
