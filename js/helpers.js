import { addPost } from "./build.js"
import { fetchItems } from "./fetch.js"
import { from, maxId, parent, start } from "./main.js"

export const getPosts = async(start, amount, posts) => {
    for (let i = start; i < amount+start; i++) {
        if (!posts[i]) {
            await fetchItems(maxId-from[0], start, amount)
        }
        addPost(posts[i], parent)
    }
    console.log(posts.length === new Set(posts.map(e => e.id)).size)
}

export const throttle = (func, delay = 300) => {
    let shouldWait = false
    return (...args) => {
        if (shouldWait) return
        
        func(...args)
        shouldWait = true

        setTimeout(() => {
            shouldWait = false
        }, delay)
    }
}

export const loadMore = throttle(async(posts) => {
    const amount = 3
    start[0] += amount
        console.log("Here")
        await getPosts(start[0], amount, posts)
}, 1000)

export const clearAll = () => {
    const parent = document.querySelector(".posts .container")
    parent.innerHTML = ""
}