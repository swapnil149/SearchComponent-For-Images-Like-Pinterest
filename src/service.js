const BASEURL = "https://www.flickr.com/services/rest/";
const FORMAT =
  "&format=json&api_key=1d75b04126b61bba154151600aee4dcd&nojsoncallback=1";

const getSearchPhotos = (page = 1, per_page = 10, text) => {
  const method = "flickr.photos.search";
  const url = `${BASEURL}?method=${method}${FORMAT}&page=${page}&per_page=${per_page}&text=${text}&safe_search=${3}`;
  return fetch(url).then(res => res.json());
};

export { getSearchPhotos };
