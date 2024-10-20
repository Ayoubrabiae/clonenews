const showMore = (item) => {
    item.classList.toggle("show")
}

export const addPost = (post, parent) => {
    if (!post.url && !post.title && !post.text) {
        return
    }

    const postEl = document.createElement("div")
    postEl.classList.add("post")

    const title = document.createElement("a")
    if (post.url) {
        title.href = post.url
        title.target = "_blank"
    }
    title.classList.add("title")
    title.textContent = post.title
    postEl.append(title)

    const author = document.createElement("p")
    author.classList.add("author")
    author.textContent = post.by
    postEl.prepend(author)

    if (post.text) {
        const content = document.createElement("div")
        content.classList.add("text-content")
        content.innerHTML = post.text
        if (post.url) {
            content.title = "click on title to read more"
        }
        postEl.append(content)
    }

    const bottomSection = document.createElement("div")
    bottomSection.classList.add("bottom-section")

    if (post.type != "comment") {
        const comments = document.createElement("span")
        comments.classList.add("comments")
        comments.textContent = "Comments: "+ (post.kids ? post.kids.length : 0)
        if (!post.kids) {
            comments.title = "No Comments"
        } else {
            comments.addEventListener("click", () =>  open(`post.html?q=${post.id}`, "_parent"))
        }
        bottomSection.append(comments)
    }

    const date = document.createElement("span")
    date.classList.add("date")
    date.textContent = new Date(post.time*1000).toDateString()
    bottomSection.append(date)

    postEl.append(bottomSection)

    const type = document.createElement("span")
    type.textContent = post.type
    type.classList.add("type")
    type.style.background = ({story:"#5bad00", poll:"blue", comment: "brown", job:"crimson"})[post.type] || "black"
    postEl.append(type)

    if (post.type === "comment") {
        const parent = document.createElement("p")
        parent.classList.add("parent")
        parent.textContent = "Parent"
        parent.dataset.parentId = post.parent
        parent.style.cursor = "pointer"
        parent.title = "Click to see this comment parent"
        parent.addEventListener("click", () => open(`post.html?q=${post.parent}`, "_parent"))
        postEl.prepend(parent)
    }

    parent.append(postEl)
    postEl.addEventListener("click", (e) => showMore(e.currentTarget))
}