import { Routes, Route } from 'react-router-dom'
import App from '../App'
import AuthorHome from '../features/articles/pages/AuthorHome/AuthorHome'
import ManagerHome from '../features/articles/pages/ManagerHome/ManagerHome'
import CreateArticle from '../features/articles/pages/CreateArticle'
import ArticleDetail from '../features/articles/pages/ArticleDetail'
import ProfilePage from '../features/users/pages/ProfilePage/ProfilePage'
import RegisterPage from '../features/users/pages/RegisterPage/RegisterPage'
import LoginPage from '../features/users/pages/LoginPage/LoginPage'
import ArticleForm from '../features/articles/components/ArticleForm/ArticleForm'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<App />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/author" element={<AuthorHome />} />
                <Route path="/articles/edit/:id" element={<CreateArticle />} />
                <Route path="/manager" element={<ManagerHome />} />
                <Route path="/articles/new" element={<CreateArticle />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/test-form" element={<ArticleForm />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes