export const addPost = (post) => {
    const parent = document.querySelector(".posts .container")

    const postEl = document.createElement("div")
    postEl.classList.add("post")

    const title = document.createElement("a")
    title.href = post.url
    title.target = "_blank"
    title.classList.add("title")
    title.textContent = post.title
    postEl.append(title)

    const author = document.createElement("p")
    author.classList.add("author")
    author.textContent = post.by
    postEl.prepend(author)

    const bottomSection = document.createElement("div")
    bottomSection.classList.add("bottom-section")

    const comments = document.createElement("span")
    comments.classList.add("comments")
    comments.textContent = "Comments: "+ (post.kids ? post.kids.length : 0)
    if (!post.kids) {
        comments.title = "No Comments"
    }    
    bottomSection.append(comments)

    const date = document.createElement("span")
    date.classList.add("date")
    date.textContent = new Date(post.time*1000).toDateString()
    bottomSection.append(date)

    postEl.append(bottomSection)

    const type = document.createElement("span")
    type.textContent = post.type
    type.classList.add("type")
    type.style.background = ({story:"#5bad00", poll:"blue", comment: "green", job:"crimson"})[post.type] || "black"
    postEl.append(type)

    parent.append(postEl)
}