import { Routes, Route } from 'react-router-dom'
import App from '../App.jsx'
import AuthorHome from '../features/articles/pages/AuthorHome'
import ManagerHome from '../features/articles/pages/ManagerHome'
import CreateArticle from '../features/articles/pages/CreateArticle'
import ArticleDetail from '../features/articles/pages/ArticleDetail'
import ProfilePage from '../features/users/pages/ProfilePage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="author" element={<AuthorHome />} />
                <Route path="manager" element={<ManagerHome />} />
                <Route path="articles/new" element={<CreateArticle />} />
                <Route path="articles/:id" element={<ArticleDetail />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes