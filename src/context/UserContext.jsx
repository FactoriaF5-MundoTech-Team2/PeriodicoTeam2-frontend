import { createContext, useContext, useState } from "react"
import { createUser, loginUser } from "../features/users/services/userService"

const UserContext = createContext()

const ROLE_IDS = {
    AUTHOR: 2,
    MANAGER: 1
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    const register = async ({ name, email, password, roles }) => {
        const rolesIds = roles.map(role => ROLE_IDS[role])
        const userData = { name, email, password }
        const newUser = await createUser(userData, rolesIds)
        setCurrentUser({ ...newUser, roles })
        return newUser
    }

    const login = async ({ email, password }) => {
        const user = await loginUser({ email, password })
        setCurrentUser(user)
        return user
    }

    const logout = () => setCurrentUser(null)

    const hasRole = (role) => currentUser?.roles?.includes(role)

    return (
        <UserContext.Provider value={{ currentUser, login, register, logout, hasRole }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)