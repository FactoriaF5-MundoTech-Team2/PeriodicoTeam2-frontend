import { createContext, useContext, useState } from "react"
import { createUser, loginUser } from "../features/users/services/userService"

const UserContext = createContext()

const ROLE_IDS = {
    AUTHOR: 2,
    MANAGER: 1
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("currentUser")
        return saved ? JSON.parse(saved) : null
    })

    const saveUser = (user) => {
        setCurrentUser(user)
        localStorage.setItem("currentUser", JSON.stringify(user))
    }

    const register = async ({ name, email, password, roles }) => {
        const rolesIds = roles.map(role => ROLE_IDS[role])
        const userData = { name, email, password }
        const newUser = await createUser(userData, rolesIds)
        saveUser({ ...newUser, roles })
        return newUser
    }

    const login = async ({ email, password }) => {
        const user = await loginUser({ email, password })
        saveUser(user)
        return user
    }

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem("currentUser")
    }

    const hasRole = (role) => currentUser?.roles?.includes(role)

    return (
        <UserContext.Provider value={{ currentUser, login, register, logout, hasRole }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)