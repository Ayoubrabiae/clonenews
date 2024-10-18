export const fetchData = async(url) => {
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export const fetchItem = async(id) => {
    return await fetchData(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
}