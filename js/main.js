import { fetchData, fetchItems } from "./fetch.js";
import { clearAll, getPosts, loadMore } from "./helpers.js";

export let maxId = await fetchData("https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty")
export let posts = []
export let comments = []
export let start = [0]
export let from = [0]
export const parent = document.querySelector(".posts .container")
let isComment = false
const postsAmount = 5

await fetchItems(maxId, from[0], postsAmount)
getPosts(start[0], postsAmount, posts)
//clearAll()

// Infinite scroll
window.addEventListener("scroll", () => {
    //console.log(document.body.clientHeight-scrollY)
    if (document.body.clientHeight-scrollY <= 1000) {
        if (isComment) {
            loadMore(comments)
        } else {
            loadMore(posts)
        }
    }
})

// Change Between comments and posts
const postLink = document.querySelector("#post-link")
const commentLink = document.querySelector("#comment-link")

postLink.addEventListener("click", () => {
    clearAll()
    start[0] = 0
    getPosts(start[0], postsAmount, posts)
    isComment = false
})

commentLink.addEventListener("click", () => {
    clearAll()
    start[0] = 0
    getPosts(start[0], postsAmount, comments)
    isComment = true
})


// Live Data : mettre à jour les posts toutes les 5 secondes
setInterval(async () => {
    const newMaxId = await fetchData("https://hacker-news.firebaseio.com/v0/maxitem.json");
    if (newMaxId > maxId) {
        const notf = document.createElement("span")
        notf.classList.add("notification")
        notf.textContent = "new items"
        document.body.append(notf)
        document.body.addEventListener("click", (e) => {
            if(e.target.classList.contains("notification")) {
                window.location.reload()
            } else {
                notf.remove()
            }
        })
        setTimeout(() => notf.remove(), 3000)
        //window.location.reload()
        //alert("New data is available!"); // Alerter l'utilisateur qu'il y a des nouvelles données
    }
}, 5000);