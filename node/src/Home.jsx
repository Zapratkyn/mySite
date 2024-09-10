import { useState, useEffect } from "react"
import {Loading, Title} from "./Helpers"
import { useMediaQuery } from 'react-responsive'

function Home({props}) {

    const [articles, setArticles] = useState(undefined)

    useEffect(() => {
        if (!articles) {
            setArticles('loading')
            fetch('/projects/articles').then(response => {
                if (response.status === 200)
                    response.json().then(data => setArticles(data.list))
            })
        }
    }, [articles])

    if (!articles || articles === 'loading')
        return <Loading />

    return (
        <section className="pe-2">
           <Title title={props.language.home} />
           {articles.map(article => <Article key={article.id} article={article} props={props} />)}
        </section>
    )
}

function Article({article, props}) {
    
    const lg = useMediaQuery({query: '(max-width: 1000px)'})

    return (
        <article className={`border rounded p-3 ${lg ? 'w-100' : 'w-75'}`}>
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