import { createContext, useContext, useState } from "react"
import { createUser } from "../features/users/services/userService"
import * as authService from "../features/users/services/authService"

const UserContext = createContext()

// IDs de roles en la BD (AUTHOR=1, MANAGER=2 según orden de creación)
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

const logout = () => setCurrentUser(null)

const hasRole = (role) => currentUser?.roles?.includes(role)

const login = async (credentials) => {
  const res = await authService.login(credentials)
  localStorage.setItem("token", res.data.token)
  const user = res.data.user || res.data
  setCurrentUser(user)
  return user
}

return (
<UserContext.Provider value={{ currentUser, login, register, logout, hasRole }}>
    {children}
    </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)