import { useState, useEffect } from 'react';
import NewsItemComponent from './NewsItemComponent'
import { getNewsData } from "../services/NewsService";
import PropTypes from 'prop-types'
import SpinnerComponent from './SpinnerComponent';
import AppUtils from "../utils/AppUtils.json";
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsComponent = ({ country, category, pazeSize, setProgress }) => {
    document.title = `${category.charAt(0).toUpperCase()}${category.slice(1)} - ${AppUtils.appTitle}`;
    const [NewsComponentState, setNewsComponentState] = useState(() => {
        return {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: true
        }
    });

    useEffect(() => {
        setProgress(50);
        getNewsData(country, category, NewsComponentState.page, pazeSize)
            .then(res => {
                setNewsComponentState(prevState => {
                    return {
                        articles: res.articles,
                        page: prevState.page,
                        totalResults: res.totalResults,
                        loading: false
                    }
                });
                setProgress(100);
            });
    }, []);

    const fetchMoreData = () => {
        getNewsData(country, category, NewsComponentState.page + 1, pazeSize)
            .then(res => {
                setNewsComponentState(prevState => {
                    return {
                        articles: prevState.articles.concat(res.articles),
                        page: prevState.page + 1,
                        totalResults: prevState.totalResults,
                        loading: false
                    }
                })
            });
    }

    return (
        <div className='container my-3'>
            <h2>Top Headlines</h2>
            {NewsComponentState.loading && <SpinnerComponent />}
            <InfiniteScroll
                dataLength={NewsComponentState.articles.length}
                next={fetchMoreData}
                hasMore={NewsComponentState.articles.length !== NewsComponentState.totalResults}
                loader={<SpinnerComponent />}
                style={{ overflow: "hidden" }}>
                <div className='row'>
                    {NewsComponentState.articles.map(article => {
                        return <div className='col-lg-4 d-flex align-items-stretch' key={article.url}>
                            <NewsItemComponent
                                title={article.title}
                                description={article.description}
                                imgUrl={article.urlToImage}
                                newsUrl={article.url}
                                author={article.author}
                                publishedAt={article.publishedAt} />
                        </div>
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default NewsComponent

NewsComponent.defaultProps = {
    country: AppUtils.defaultCountry,
    category: AppUtils.defaultCategory,
    pazeSize: AppUtils.defaultPazeSize
}

NewsComponent.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    setProgress: PropTypes.func
}
