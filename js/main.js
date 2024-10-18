import { addPost } from "./build.js";
import { fetchData, fetchItem } from "./fetch.js";

const ids = await fetchData("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")

for (let i = 0; i < 10; i++) {
    console.log(await fetchItem(ids[i]))
    addPost(await fetchItem(ids[i]))
}