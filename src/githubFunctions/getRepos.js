

export default function getRepos(language){
    const randomPageNum = Math.floor(Math.random() * 25) + 1
    fetch(
        `https://api.github.com/search/repositories?q=language:${language}&page_limit=25&page=${randomPageNum}`
    ).then(
        res => res.json()
    ).then(
        res => {
            const randomRepo = Math.floor(Math.random() * 30) + 1
            returnres['items'][randomRepo].url
       }
    )
}