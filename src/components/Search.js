import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby";

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div className="my-4">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <img src="https://img.icons8.com/material-outlined/24/000000/search.png" alt="search-icon" />
            </span>
          </div>
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            value={this.state.query}
            onChange={this.search} />
        </div>

        {this.state.results.map(page => (
          <div key={page.id} className="card my-4">
            <Link to={"/" + page.path} >
              <h4 className="card-title">{page.title}</h4>
            </Link>
            <div className="card-text mt-1">
              <img
                src="https://img.icons8.com/material/24/00BCD4/tags.png"
                alt="tag-icon"
                width="24" />
              {` `}
              {page.tags.join(`,`)}
            </div>
          </div>
        ))}

      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
      Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}