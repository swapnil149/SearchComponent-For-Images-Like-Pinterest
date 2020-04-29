import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "./style.css";
import { getPhotoUrl, getUniqueItemsArray, defaultStyles } from "./util.js";
import { getSearchPhotos } from "./service";
import debounce from "lodash.debounce";
import RealRender from "./RealRender";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      per_page: 30,
      photo: [],
      photoURLs: [],
      hasMore: true,
      searchValue: "",
      anchorEl: null,
      prevSearch: [],
      isModalOpen: false,
      modalImageUrl: null
    };

    this.callAPI = debounce(this.callAPI, 500);
  }
  //For storing previous search queries
  componentDidMount() {
    const prevQueryWithSpaces = localStorage.getItem("prevSearch");
    const prevQuery = JSON.parse(
      prevQueryWithSpaces ? prevQueryWithSpaces.trim() : prevQueryWithSpaces
    );
    const prevSearch = prevQuery ? prevQuery : [];
    this.setState({ prevSearch });
  }

  //To open particular image in Modal
  handleImageOpen = event => {
    const modalImageUrl = event.target.src;
    this.setState({
      modalImageUrl,
      isModalOpen: true
    });
  };

  //To close particular image in Modal
  handleImageClose = event => {
    this.setState({
      modalImageUrl: null,
      isModalOpen: false
    });
  };

  //API call for the searched value
  callAPI = (fatehingMore = false) => {
    this.state.searchValue &&
      getSearchPhotos(
        this.state.page,
        this.state.per_page,
        this.state.searchValue
      ).then(({ stat, photos }) => {
        this.setState(
          prevState => ({
            prevSearch: getUniqueItemsArray([
              ...prevState.prevSearch,
              this.state.searchValue
            ]),
            photo: fatehingMore
              ? [...prevState.photo, ...photos.photo]
              : photos.photo,
            photoURLs: fatehingMore
              ? getUniqueItemsArray([
                  ...prevState.photoURLs,
                  ...photos.photo.map(getPhotoUrl)
                ])
              : getUniqueItemsArray(photos.photo.map(getPhotoUrl))
          }),
          () => {
            const local = this.state.prevSearch;
            localStorage.setItem(
              "prevSearch",
              local ? JSON.stringify(local).trim() : JSON.stringify(local)
            );
          }
        );
      });
  };

  //To Search images while typing
  handleSearch = event => {
    this.setState(
      {
        searchValue: event.target.value
          ? event.target.value.trim()
          : event.target.value
      },
      this.callAPI
    );
  };

  //To suggest item from previous search list
  handleSelectionFromSuggest = (e, value) => {
    this.setState({ searchValue: value ? value.trim() : value }, this.callAPI);
  };

  //To fetch more images while scrolling down
  fetchMoreData = () => {
    this.setState(
      prev => ({ page: prev.page + 1 }),
      () => {
        this.callAPI(true);
      }
    );
  };

  render() {
    return (
      <RealRender
        {...this.props}
        {...this.state}
        handleSearch={this.handleSearch}
        fetchMoreData={this.fetchMoreData}
        handleSelectionFromSuggest={this.handleSelectionFromSuggest}
        handleImageOpen={this.handleImageOpen}
        handleImageClose={this.handleImageClose}
      />
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(defaultStyles, { withTheme: true })(App);
