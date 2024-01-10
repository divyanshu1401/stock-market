import { useContext, createContext } from "react";
import { useState } from "react";

const AppContext = createContext()



const AppProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "TM"])

    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el) => {
            return el !== stock
        }))
    }

    return <AppContext.Provider value={
        {
            setWatchList,
            watchList,
            addStock,
            deleteStock
        }
    }>
        {children}
    </AppContext.Provider>

}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }