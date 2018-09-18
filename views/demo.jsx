import React, { Component } from "react";
import { Icon, Alert } from "watson-react-components";
import { fields } from "./fields";
import Query from "./Query/index";
import TopEntities from "./TopEntities/index";
import TopStories from "./TopStories/index";
import AnomalyDetection from "./AnomalyDetection/index";
import WidgetHeader from "./WidgetHeader/index";
import SentimentAnalysis from "./SentimentAnalysis/index";
import MentionsAndSentiments from "./MentionsAndSentiments/index";
import NoResults from "./NoResults/index";
import { CSVLink, CSVDownload } from "react-csv";
import Img from "react-image";
import "./style.css";

const hasResults = entities =>
  entities.aggregations &&
  entities.aggregations.length > 0 &&
  entities.aggregations[0].field === fields.title_entity_text;

const parseQueryResults = data => {
  const parsedData = {
    results: data.results, // Top Results
    entities: {}, // Topic cloud
    sentiments: null, // Sentiment by source
    sentiment: null, // Overall sentiment
    mentions: null, // Mentions and Sentiments
    anomalyData: null // Anomaly data
  };

  data.aggregations.forEach(aggregation => {
    // sentiments by source
    if (aggregation.type === "term" && aggregation.field === fields.host) {
      parsedData.sentiments = aggregation;
    }
    // Overall sentiment
    if (
      aggregation.type === "term" &&
      aggregation.field === fields.text_document_sentiment_type
    ) {
      parsedData.sentiment = aggregation;
    }

    if (
      aggregation.type === "term" &&
      aggregation.field === fields.title_concept_text
    ) {
      parsedData.entities.topics = aggregation.results;
    }

    // Mentions and sentiments
    if (
      aggregation.type === "filter" &&
      "aggregations" in aggregation &&
      aggregation.aggregations[0].field === fields.title_entity_text
    ) {
      parsedData.mentions = aggregation;
    }

    if (
      aggregation.type === "nested" &&
      aggregation.path === fields.title_entity
    ) {
      const entities = aggregation.aggregations;
      if (entities && entities.length > 0 && hasResults(entities[0])) {
        if (entities[0].match === `${fields.title_entity_type}:Company`) {
          parsedData.entities.companies = entities[0].aggregations[0].results;
        }
        if (entities[0].match === `${fields.title_entity_type}:Person`) {
          parsedData.entities.people = entities[0].aggregations[0].results;
        }
      }
    }

    if (aggregation.type === "timeslice" && aggregation.anomaly) {
      parsedData.anomalyData = aggregation.results;
    }
  });

  return parsedData;
};

export default class Demo extends Component {
  static propTypes = {
    candidateNo: Number
  };

  state = {
    query: null,
    error: null,
    data: null,
    loading: false
  };

  getCandidateName() {
    switch (this.props.candidateNo) {
      case 1:
        return "Andrew Cuomo";
      case 2:
        return "Cynthia Nixon";
      case 3:
        return "Kathy Hochul";
      default:
        return "default";
    }
  }

  getCandidateDesc() {
    switch (this.props.candidateNo) {
      case 1:
        return "Andrew Mark Cuomo is an American politician, author and lawyer serving as the 56th and current Governor of New York since 2011. A member of the Democratic Party, he was elected to the same position his father, Mario Cuomo, held for three terms.";

      case 2:
        return "Cynthia Ellen Nixon is an American actress, activist, and politician. For her portrayal of Miranda Hobbes in the HBO series Sex and the City, Nixon won the 2004 Primetime Emmy Award for Outstanding Supporting Actress in a Comedy Series. She reprised the role in the films Sex and the City and Sex and the City 2.";
      case 3:
        return "Kathleen Courtney Hochul is an American politician serving as Lieutenant Governor of New York since 2015. She previously served as the U.S. Representative for New York's 26th congressional district from June 1, 2011 to January 3, 2013.";
      default:
        return "default";
    }
  }

  getCandidateImage() {
    return <Img src={"images/" + this.props.candidateNo + ".jpg"} />;
  }
  getCandidateParty() {
    return "Democratic Party";
  }

  componentDidMount() {
    console.log("COMPONENTNED");
    this.fetchNewData({
      text: this.getCandidateName(), //this.props.candidateName
      date: { from: "20180908", to: "20180915" },
      restrictedDateRange: true
    });
  }

  handleQueryChange = query => {
    this.fetchNewData(query);
  };
  /**
   * Call the query API every time the query change.
   */
  fetchNewData = query => {
    this.setState({ query, loading: true });
    const host = process.env.REACT_APP_SERVER || "";
    fetch(`${host}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({ loading: false, data: parseQueryResults(json) });
        });
      } else {
        response
          .json()
          .then(error => {
            this.setState({ error: error.error, loading: false });
          })
          .catch(error => {
            this.setState({
              error:
                error ||
                "There was a problem with the request, please try again",
              loading: false
            });
          });
      }
    });
    // scroll to the loading bar
    window.scrollTo(100, 344);
  };

  render() {
    return (
      <div className="demo-container--div">
        <Query
          onQueryChange={this.handleQueryChange}
          query={this.state.query}
        />
        {this.state.error && (
          <Alert type="error-o" color="red">
            <p className="base--p">{this.state.error}</p>
          </Alert>
        )}
        {this.state.loading && (
          <div className="results">
            <div className="loader--container">
              <Icon type="loader" size="large" />
            </div>
          </div>
        )}
        {!this.state.loading &&
        this.state.data &&
        this.state.data.results.length > 0 ? (
          <div className="results">
            <div className="_container _container_large">
              <div className="results--panel">
                <div className="demo-column">
                  <div className="avatar">{this.getCandidateImage()}</div>
                </div>
                <div className="demo-column">
                  <h2>{this.getCandidateName()}</h2>
                  <h2 id="partyStyle">{this.getCandidateParty()}</h2>
                  <p className="descStyle">{this.getCandidateDesc()}</p>
                </div>
              </div>
              <div className="results--panel">
                <WidgetHeader
                  title={"Legislation Stances"}
                  onShowQuery={this.onShowQuery}
                />
                <div className="issueName">
                  <p>Abortion</p>
                </div>
                <div className="issueStance">
                  <p>
                    Codify state with federal law to allow 9th-month abortions.
                    (May 2014)
                  </p>
                  <p>
                    {" "}
                    Let women make decision: pregnancy, adoption, or abortion.
                    (Jan 2013)
                  </p>
                </div>
                <div className="issueName">
                  <p>Budget & Economy</p>
                </div>
                <div className="issueStance">
                  <p>
                    2015 Opportunity Agenda: cut $1.7B taxes; add $1.5B
                    programs. (Jan 2015)
                  </p>
                  <p>
                    {" "}
                    Economic Blueprint: growth via development projects. (Jan
                    2012)
                  </p>
                </div>
              </div>

              <div className="results--panel">
                <TopStories
                  query={this.state.query}
                  stories={this.state.data.results}
                  onShowCode={this.toggleTopResults}
                  onSortChange={this.handleQueryChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="results--panel-3">
                <SentimentAnalysis
                  query={this.state.query}
                  sentiment={this.state.data.sentiment}
                  sentiments={this.state.data.sentiments}
                />
              </div>
            </div>
          </div>
        ) : (
          !this.state.loading &&
          this.state.data && <NoResults query={this.state.query} />
        )}
      </div>
    );
  }
}
