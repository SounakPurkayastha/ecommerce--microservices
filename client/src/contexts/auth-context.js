import { createContext, useState } from "react"

export const AuthContext = createContext({
    token: null,
    userid: null,
    username: null,
    login : () => {}
})

export const AuthContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userid, setUserid] = useState(localStorage.getItem("userid"));
    const [username, setUsername] = useState(localStorage.getItem("username"));

    const login = (token, userid, username) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userid);
        localStorage.setItem("username", username);
        setToken(token);
        setUserid(userid);
        setUsername(username);
        const items = localStorage.getItem("itemsnull");
        const itemsCount = localStorage.getItem("itemsCountnull");
        const total = localStorage.getItem("totalnull");
        localStorage.removeItem("itemsnull");
        localStorage.removeItem("itemsCountnull");
        localStorage.removeItem("totalnull");
        localStorage.setItem(`items${userid}`, items);
        localStorage.setItem(`itemsCount${userid}`,itemsCount);
        localStorage.setItem(`total${userid}`, total);   
    }

    const logout = () => {
        setToken(null);
        setUserid(null);
        setUsername(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        localStorage.removeItem(`items${userid}`);
        localStorage.removeItem(`itemsCount${userid}`);
        localStorage.removeItem(`total${userid}`);
        window.location.reload();
    }

    return <AuthContext.Provider value={{token:token, userid:userid, username:username, login:login, logout:logout}}>
        {props.children}
    </AuthContext.Provider>
}

