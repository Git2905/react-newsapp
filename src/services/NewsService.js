import sampleData from "../testdata/SampleResp"

export let getSampleNewsData = function () {
    return sampleData.articles;
}

export let getNewsData = function (country, category, pageNo, pageSize) {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${pageNo}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_NEWS_API}`;
    return fetch(url).then(resp => resp.json());
}