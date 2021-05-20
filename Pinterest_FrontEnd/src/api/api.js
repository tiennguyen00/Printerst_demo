import axios from "axios";

let pixabayApi = "https://pixabay.com/api/";

const pixabay = axios.create({
  baseURL: pixabayApi,
  header: {
    "X-RateLimit-Limit": 100,
  },
});

const resultFromApi = async (result) => {
  let resultsFromPixabay = [];

  try {
    const getImgPixabay = await pixabay.get(`https://pixabay.com/api/`, {
      params: {
        key: "21224893-c61153f1d9b5a52314e204800",
        q: result,
        per_page: 100,
      },
    });

    const dataFromPixabay = getImgPixabay.data.hits.map((img) => {
      return {
        urls: img.webformatURL,
        downloads: img.downloads,
        likes: img.likes,
        tags: img.tags,
        user: img.user,
        views: img.views,
      };
    });

    resultsFromPixabay = [...resultsFromPixabay, ...dataFromPixabay];
  } catch (err) {
    console.log(err.message);
  }

  return [...resultsFromPixabay];
};

const getNewPins = async () => {
  let pinDataFromUnsplash = [];
  let pinDataFromPixabay = [];
  let pinData;
  let sampleInput = ["coin", "landscape", "dog"];

  try {
    for (let term in sampleInput) {
      const getImgPixabay = await pixabay.get(`https://pixabay.com/api/`, {
        params: {
          key: "21224893-c61153f1d9b5a52314e204800",
          q: term,
          per_page: 200,
          page: 2,
        },
      });

      const dataFromPixabay = getImgPixabay.data.hits.map((img) => {
        return {
          urls: img.webformatURL,
          downloads: img.downloads,
          likes: img.likes,
          tags: img.tags,
          user: img.user,
          views: img.views,
        };
      });
      pinDataFromPixabay = [...dataFromPixabay];
    }
  } catch (err) {
    console.log(err.message);
  }
  pinData = [...pinDataFromUnsplash, ...pinDataFromPixabay];

  return pinData;
};

export { getNewPins, resultFromApi };
