const API_URL = `https://itunes.apple.com/search?term=`

const fetchSearch = (searchTerm) => {
    return fetch(API_URL + searchTerm)
        .then(response => response.json())
        .then(resData => resData.results)
}

const wrapPromise = (promise) => {
    let status = 'pending'
    let result = ''
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })
    return {
        read() {
            if (status === 'pending') {
                throw suspender
            } else if (status === 'error') {
                throw result
            }
            return result
        }
    }
}

export const createResource = (searchTerm) => {
    console.log(searchTerm)
    return {
        result: wrapPromise(fetchSearch(searchTerm))
    }
}


