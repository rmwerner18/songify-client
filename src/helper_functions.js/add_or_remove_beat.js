export const addOrRemoveBeat = (newArray, id) => {
    if (newArray.includes(parseInt(id))) {
        let index = newArray.findIndex(n => n === parseInt(id))
        newArray.splice(index, 1)
    } else {
        newArray.push(parseInt(id))
    }
    return newArray
}