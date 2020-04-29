import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ImageViewModal from "./ImageModal";

const RealRender = props => {
  const {
    classes,
    photo,
    prevSearch,
    fetchMoreData,
    photoURLs,
    hasMore,
    handleSearch,
    handleSelectionFromSuggest,
    handleImageOpen,
    handleImageClose,
    isModalOpen,
    modalImageUrl,
    searchValue
  } = props;
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <Typography gutterBottom variant="h5">
              Search
            </Typography>

            <Autocomplete
              id="combo-box-demo"
              options={[...prevSearch]}
              getOptionLabel={option => option}
              style={{ width: 300 }}
              onChange={handleSelectionFromSuggest}
              renderInput={params => (
                <TextField
                  {...params}
                  onChange={handleSearch}
                  placeholder="e.g Animal"
                />
              )}
            />
          </Toolbar>
        </AppBar>
        <InfiniteScroll
          dataLength={photo ? photo.length : 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4> </h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="imageContainer">
            {photoURLs &&
            searchValue &&
            photoURLs.length &&
            searchValue.length ? (
              photoURLs.map(src => (
                <img key={src} src={src} alt=" " onClick={handleImageOpen} />
              ))
            ) : (
              <Typography className={classes.paper} variant="h5">
                Start Searching
              </Typography>
            )}
          </div>
        </InfiniteScroll>
      </div>
      <ImageViewModal
        classes={classes}
        handleImageClose={handleImageClose}
        isModalOpen={isModalOpen}
        modalImageUrl={modalImageUrl}
      />
    </>
  );
};

export default RealRender;
