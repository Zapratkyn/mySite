import { useEffect, useState } from "react"
import { Title } from "./Helpers"

function Admin({props}) {

    const [data, setData] = useState(undefined)

    useEffect(() => {
        if (!data) {
            fetch('/backAdmin').then(response => {
                if (response.status === 200) {
                    response.json().then(newData => setData(newData))
                }
            })
        }
    })

    if (!data)
        return <h1>{props.language.goAway}</h1>

    return (
        <section className="me-2">
            <Title title='Admin' />
            <div className="d-flex gap-3 mb-2">
                <h2 className="ps-3 text-decoration-underline fw-bold">Projets</h2>
                <button type="button" className="btn btn-success">Nouveau projet</button>
            </div>
            <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.projects.length === 0 ?
                    <h3>Aucun projet</h3> :
                    data.projects.map(project => <Project key={project.id} props={props} project={project} />)
                }
            </div>
            <h2 className="ps-3 mt-3 text-decoration-underline fw-bold">Suggestions</h2>
            <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.suggestions.length === 0 ?
                    <h3>Aucune suggestion</h3> :
                    data.suggestions.map(suggestion => <Suggestion key={suggestion.authorId} props={props} suggestion={suggestion} />)
                }
            </div>
        </section>
    )

}

function Project({props, project}) {

    return (
        <div className="bg-secondary-subtle rounded p-2 d-flex justify-content-between">
            <h4>{project.name}</h4>
            <div className="d-flex gap-2">
                <button type='button' className="btn btn-secondary">Voir</button>
                <div className="position-relative">
                    {project.newMessage && <img className="newMessage" src="images/circle-fill.svg" alt="" />}
                    <button type='button' className="btn btn-secondary">
                        Messages
                    </button>
                </div>
            </div>
        </div>
    )

}

function Suggestion({props, suggestion}) {

    return (
        <div className="bg-secondary-subtle rounded p-2 d-flex justify-content-between">
            <div className="d-flex gap-2 fs-4">
                {suggestion.title} || par <span type='button' className="text-primary text-decoration-underline">{suggestion.author}</span>
            </div>
            <div><button type='button' className="btn btn-secondary">Lire</button></div>
        </div>
    )

}

export default Admin