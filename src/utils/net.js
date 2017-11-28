
const DEFAULT = {
    headers: {
    },
    mode: 'cors',

}
//this piece of shit service doesn't even return JSON headers.
const request = async (url, options) => {
    try {
        const response  = await fetch(url, {
            ...DEFAULT,
            ...options,
            headers: {
                ...DEFAULT.headers,
                ...options.headers,
            },
        })

        let json = {}
        if(response.ok) json = await response.json()

        return json

    } catch(err) {
        console.error(err)
        throw err
    }
}

export const post = async (url, body, options) => {
    try {
        if(!body) throw new Error(`Cannot POST to ${url} with no body`)
        return await request(url, { ...options, method: 'POST', body: JSON.stringify(body) })
    } catch(err) {
        throw err
    }
}

export const deletion = async (url, body, options) => {
    try {
        if(!body) body = {}
        return await request(url, { ...options, method: 'DELETE', body: JSON.stringify(body) })
    } catch(err) {
        throw err
    }
}

export const get = async (url, options) => {
    try {
        return await request(url, { ...options, method: 'GET' })
    } catch(err) {
        throw err
    }
}