

function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}


export function fromArray(arr, omitValue) {
    const value = getRandomFromArray(arr)
    if(omitValue === value) {
        return fromArray(arr, omitValue)
    }else{
        return value
    }
}

export function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}




export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }

    return array
}