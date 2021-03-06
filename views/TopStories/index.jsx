import React, { Component } from "react";
import { string, object, func, arrayOf, shape } from "prop-types";
import WidgetHeader from "../WidgetHeader/index";
import QuerySyntax from "../QuerySyntax/index";
import queryBuilder from "../../query-builder";
import Story from "./Story";
import SortSelect from "./SortSelect";
import { fields } from "../fields";

export default class TopStories extends Component {
  static propTypes = {
    stories: arrayOf(object).isRequired,
    query: shape({
      text: string.isRequired,
      date: shape({
        from: string.isRequired,
        to: string.isRequired
      }).isRequired
    }).isRequired,
    onSortChange: func.isRequired
  };

  static widgetTitle() {
    return "Top Stories";
  }

  static widgetDescription() {
    return "Find the most recent and relevant news articles.";
  }

  state = {
    showQuery: false,
    sortType:
      typeof this.props.query.sort === "undefined" ||
      this.props.query.sort === "relevance"
        ? "relevance"
        : "date"
  };

  onShowQuery = () => {
    this.setState({ showQuery: true });
  };

  onShowResults = () => {
    this.setState({ showQuery: false });
  };

  onChangeSort = e => {
    const sortVal = e.target.value;
    this.setState({ sortType: sortVal });
    const newQuery = Object.assign({}, this.props.query, {
      sort: sortVal
    });
    this.props.onSortChange(newQuery);
  };

  render() {
    const { stories, query } = this.props;

    return (
      <div>
        {!this.state.showQuery ? (
          <div className="top-stories widget">
            <WidgetHeader
              title={TopStories.widgetTitle()}
              onShowQuery={this.onShowQuery}
            />
            <div className="top-stories--list">
              {stories.map(item => (
                <Story
                  key={item.id}
                  title={item[fields.title] || "Untitled"}
                  url={item[fields.url]}
                  host={item[fields.host]}
                  date={item[fields.publication_date]}
                  score={item.score}
                />
              ))}
            </div>
          </div>
        ) : (
          <QuerySyntax
            title="Top Stories"
            query={queryBuilder.build(
              query,
              queryBuilder.widgetQueries.topStories
            )}
            response={{ results: stories }}
            onGoBack={this.onShowResults}
          />
        )}
      </div>
    );
  }
}
