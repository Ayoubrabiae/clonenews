import { comments, from, posts } from "./main.js"

export const fetchData = async(url) => {
    const response = await fetch(url)
    const data =  response.json()

    return data
}

const fetchMultiple = async(id, amount) => {
    let min = 0
    const urls = [] 
    Array(amount).fill(id).map(() => {
        const item = fetch(`https://hacker-news.firebaseio.com/v0/item/${id-min}.json`)
        min++
        urls.push(item)
    })

    const res = await Promise.all(urls)
    const data = await Promise.all(res.map(item => item.json()))

    return data
}

// export const fetchItem = async(id) => {
//     return await fetchData(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
// }

// Fetch Last 100 Post
export const fetchItems = async(id, start, amount) => {
    const postsCount = amount
    while(posts.length < postsCount+start || comments.length < postsCount+start) {
        const items = await fetchMultiple(id, 5)
        items.forEach(async item => {
            from[0]++
            id-=1
            if (item.deleted || item.dead) {
                return
            }
            if (item.type === "comment") {
                comments.push(item)
            } else {
                posts.push(item)
            }
        })
    }
}