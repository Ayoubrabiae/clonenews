export const addPost = (post) => {
    const parent = document.querySelector(".posts .container")

    const postEl = document.createElement("div")
    postEl.classList.add("post")

    const title = document.createElement("a")
    title.href = post.url
    title.textContent = post.title
    title.style.display = "block"
    postEl.append(title)

    const bottomSection = document.createElement("div")
    bottomSection.classList.add("bottom-section")

    const author = document.createElement("span")
    author.classList.add("author")
    author.textContent = post.by
    bottomSection.appendChild(author)

    const comments = document.createElement("span")
    comments.classList.add("comments")
    comments.textContent = "Comments: "+ (post.kids ? post.kids.length : 0)
    bottomSection.append(comments)

    postEl.append(bottomSection)

    parent.append(postEl)
}