import axios from "axios";

let unsplashApi = "https://api.unsplash.com";
let pixabayApi = "https://pixabay.com/api/";

const unsplash = axios.create({
  baseURL: unsplashApi,
  headers: {
    Authorization: "Client-ID USlO7ONMxpaG7ffnkl-6vgw2cAAQv6nEaXqNoSJuuHc",
  },
});

const pixabay = axios.create({
  baseURL: pixabayApi,
  header: {
    "X-RateLimit-Limit": 100,
  },
});

const resultFromApi = async (result) => {
  let resultsFromUnsplash = [];
  let resultsFromPixabay = [];

  try {
    // const getImgUnsplash = await unsplash.get(
    //   "https://api.unsplash.com/search/photos",
    //   {
    //     params: { query: result, per_page: 100 },
    //   }
    // );

    // console.log(getImgUnsplash);
    // const dataFromUnsplash = getImgUnsplash.data.results.map((img) => {
    //   return { urls: img.urls.full };
    // });

    // resultsFromUnsplash = [...resultsFromUnsplash, ...dataFromUnsplash];

    const getImgPixabay = await pixabay.get(`https://pixabay.com/api/`, {
      params: {
        key: "21224893-c61153f1d9b5a52314e204800",
        q: result,
        per_page: 150,
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

  return [...resultsFromPixabay, ...resultsFromUnsplash];
};

const getNewPins = async () => {
  let pinDataFromUnsplash = [];
  let pinDataFromPixabay = [];
  let pinData;
  let sampleInput = ["coin", "landscape", "dog"];

  try {
    for (let term in sampleInput) {
      // const getImgUnsplash = await unsplash.get(
      //   "https://api.unsplash.com/photos/random",
      //   {
      //     params: { query: term, count: 50 },
      //   }
      // );
      // console.log(getImgUnsplash);

      // const dataFromUnsplash = getImgUnsplash.data.map((img) => {
      //   return {
      //     urls: img.urls.regular,
      //     username: img.user.username,
      //     updateTime: img.updated_at,
      //   };
      // });

      // console.log(dataFromUnsplash);

      // pinDataFromUnsplash = [...pinDataFromUnsplash, ...dataFromUnsplash];

      const getImgPixabay = await pixabay.get(`https://pixabay.com/api/`, {
        params: {
          key: "21224893-c61153f1d9b5a52314e204800",
          q: term,
<<<<<<< HEAD
          per_page: 150,
=======
          per_page: 25,
>>>>>>> 09c588e
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
      pinDataFromPixabay = [...pinDataFromPixabay, ...dataFromPixabay];
    }
  } catch (err) {
    console.log(err.message);
  }
  pinData = [...pinDataFromUnsplash, ...pinDataFromPixabay];

  return pinData;
};

<<<<<<< HEAD
export { getNewPins, resultFromApi };
=======
export { getNewPins, resultFromApi };
>>>>>>> 09c588e
