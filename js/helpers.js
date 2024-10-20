import { addPost } from "./build.js"
import { posts, start } from "./main.js"

export const getPosts = async(start) => {
    for (let i = start; i < 10+start; i++) {
        //console.log(await fetchItem(ids[i]))
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
    start[0] += 10
    getPosts(start[0])
}, 500)