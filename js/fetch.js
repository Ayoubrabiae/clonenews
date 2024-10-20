import { comments, posts } from "./main.js"

export const fetchData = async(url) => {
    const response = await fetch(url)
    const data = await response.json()

    return data
}

// export const fetchItem = async(id) => {
//     return await fetchData(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
// }

// Fetch Last 100 Post
export const fetchItems = async(id) => {
    while(posts.length < 100 || comments.length < 100) {
        const item = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        console.log(item)
        if (item.type === "comment") {
            comments.push(item)
        } else {
            posts.push(item)
        }
        id--
    }
}