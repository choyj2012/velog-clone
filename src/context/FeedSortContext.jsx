import { createContext, useState } from "react"

export const FeedSortContext = createContext(undefined);

const FeedSortContextProvider = ({children}) => {

  const [sortBy, setSortBy] = useState('date');

  return (
    <FeedSortContext.Provider value={{sortBy, setSortBy}}>
      {children}
    </FeedSortContext.Provider>
  )
}

export default FeedSortContextProvider;