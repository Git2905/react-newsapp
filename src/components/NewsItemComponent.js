import PropTypes from 'prop-types'

const NewsItemComponent = ({ title, description, imgUrl, newsUrl, author, publishedAt }) => {
    return (
        <div className="card my-3">
            <img src={imgUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">
                    <small className="text-muted">
                        By {author ? author : "Unknown"} on {(new Date(publishedAt)).toDateString()}
                    </small>
                </p>
                <a href={newsUrl} className="btn btn-sm btn-primary" rel='noreferrer' target="_blank">Read More</a>
            </div>
        </div>
    )
}

export default NewsItemComponent

NewsItemComponent.prototype = {
    title: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    newsUrl: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string
}
