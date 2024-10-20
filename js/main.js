import { fetchData, fetchItems } from "./fetch.js";
import { getPosts, loadMore } from "./helpers.js";

export let maxId = await fetchData("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
export let posts = []
export let comments = []
export let start = [0]
export let from = [0]
const postsAmount = 5

await fetchItems(maxId, from[0], postsAmount)
getPosts(start[0], postsAmount)


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