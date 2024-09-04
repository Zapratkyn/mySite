import { useState, useEffect } from "react"
import {Loading, Title} from "./Helpers"

function Home({props}) {

    const [articles, setArticles] = useState(undefined)

    useEffect(() => {
        if (!articles) {
            setArticles('loading')
            fetch('/backAdmin/articles').then(response => {
                if (response.status === 200)
                    response.json().then(data => setArticles(data.list))
            })
        }
    })

    if (!articles || articles === 'loading')
        return <Loading />

    // console.log(articles)

    return (
        <section className="pe-2">
           <Title title={props.language.home} />
           {articles.map(article => <Article key={article.id} article={article} props={props} />)}
        </section>
    )
}

function Article({article, props}) {

    console.log(article)

    return (
        <article className="w-75 border rounded p-3 ms-5">
            <div>
                <h2>{article.title}</h2>
                <span>{article.creation_date}</span>
                <hr />
            </div>
            <div><pre>{props.language.language === 'fr' ? article.content_fr : article.content_en}</pre></div>
        </article>
    )

}

export default Home