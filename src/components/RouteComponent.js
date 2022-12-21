import { Routes, Route } from 'react-router-dom';
import NewsComponent from '../components/NewsComponent';
import AppUtils from "../utils/AppUtils.json"

const RouteComponent = ({ setProgress }) => {
    return (
        <Routes>
            <Route key="route_component_home" exact path='/' element={<NewsComponent
                key="news_component_home"
                country={AppUtils.country}
                category={AppUtils.defaultCategory.toLowerCase()}
                pazeSize={AppUtils.pageSize}
                setProgress={setProgress} />} />
            {
                AppUtils.categories.map(category => {
                    return <Route key={`route_component_${category.toLowerCase()}`} exact path={`/${category.toLowerCase()}`}
                        element={<NewsComponent
                            key={`news_component_${category.toLowerCase()}`}
                            country={AppUtils.country}
                            category={category.toLowerCase()}
                            pazeSize={AppUtils.pageSize}
                            setProgress={setProgress} />} />
                })
            }
        </Routes>
    );
}

export default RouteComponent
