

export const getFromStaorageAndUpdateState = (
    nameInLocalStorage: string,
    //any function 
    setState:(...args: any) => any, 
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


export const removeFromStorageAndUpdateState = (
    nameInLocalStorage:string,
    setState:(...args: any) => any,
    initialState:any
    ) =>{
    localStorage.removeItem(nameInLocalStorage)
    setState(initialState)  
}