import { addPost } from "./build.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("q")

export const fetchData = async(url) => {
    const response = await fetch(url)
    const data =  response.json()

    return data
}

const backBtn = document.querySelector(".go-back")
backBtn.addEventListener("click", () => {
    window.location.href = "/"
})

const postObj = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
const parent = document.querySelector(".container .post-holder")
const commentsHolder = document.querySelector(".container .comments")

addPost(postObj, parent)

const addComment = (obj) => {
    const comment = document.createElement("div")
    comment.classList.add("comment")
    if (obj.deleted || obj.dead) {
        comment.textContent = "Comment was deleted"
    } else {
        const author = document.createElement("h3")
        author.classList.add("author")
        author.textContent = obj.by
        comment.append(author)

        const text = document.createElement("p")
        text.classList.add("text")
        text.textContent = obj.text
        comment.append(text)
    }
    commentsHolder.append(comment)
}

postObj.kids.forEach(async(id) => {
    const comment = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    addComment(comment)
})