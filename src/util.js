const getPhotoUrl = ({ farm, server, id, secret }) => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};

const getUniqueItemsArray = array => {
  const set = new Set(array);
  return Array.from(set);
};

const defaultStyles = theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3)
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  imgView: {
    border: "2px solid black"
  }
});

export { getPhotoUrl, getUniqueItemsArray, defaultStyles };
