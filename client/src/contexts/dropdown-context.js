import { createContext, useState } from "react";

export const DropdownContext = createContext({
    userDropdown:false
})

export const DropdownContextProvider = (props) => {

    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const userClickHandler = (state) => {
        setShowUserDropdown(state);
    }

    return <DropdownContext.Provider value={{
        showUserDropdown: showUserDropdown,
        onUserClick: userClickHandler
    }}>
        {props.children}
    </DropdownContext.Provider>
}