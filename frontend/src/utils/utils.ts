

export const getFromStaorageAndUpdateState = (
    nameInLocalStorage: string, 
    setState:any, 
    initialState:any) =>{
    const itemsFromStorage = localStorage.getItem(nameInLocalStorage)
    ? JSON.parse(localStorage.getItem(nameInLocalStorage) || "")
    : initialState
    setState(itemsFromStorage) 
}


export const setLocalStaorageAndUpdateState = (
    nameInLocalStorage: string, 
    item:any,
    setState:any) =>{
    localStorage.setItem(nameInLocalStorage,JSON.stringify(item))
    setState(item) 
}