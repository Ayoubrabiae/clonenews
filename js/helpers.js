import { addPost } from "./build.js"
import { fetchItems } from "./fetch.js"
import { from, maxId, posts, start } from "./main.js"

export const getPosts = async(start, amount) => {
    for (let i = start; i < amount+start; i++) {
        if (!posts[i]) {
            await fetchItems(maxId-from[0], start, amount)
        }
        addPost(posts[i])
    }
}

export const throttle = (func, delay = 300) => {
    let shouldWait = false
    return (...args) => {
        if (shouldWait) return
        
        shouldWait = true
        func(...args)
        setTimeout(() => {
            shouldWait = false
        }, delay)
    }
}

// const [def, thr] = document.querySelectorAll("h1")
// const updateText = opThrottle((text) => {
//     thr.textContent = `Throttle: ${text}`
// }, 1000, {trailing:true})

export const loadMore = throttle(() => {
    const amount = 3
    start[0] += amount
    getPosts(start[0], amount)
}, 500)