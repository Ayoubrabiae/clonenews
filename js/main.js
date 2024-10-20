import { fetchData, fetchItems } from "./fetch.js";
import { getPosts, loadMore } from "./helpers.js";

export let maxId = await fetchData("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
export let posts = []
export let comments = []
export let start = [0]

await fetchItems(maxId)
console.log(posts)
console.log(comments)
getPosts(start[0])


// Infinite scroll
window.addEventListener("scroll", () => {
    //console.log(document.body.clientHeight-scrollY)
    if (document.body.clientHeight-scrollY <= 900) {
        loadMore()
    }
})

// Load with btn
const loadBtn = document.querySelector(".load-more")
loadBtn.addEventListener("click", () => {
    loadMore()
})