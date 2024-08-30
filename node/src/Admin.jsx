import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loading, Title } from "./Helpers"
import Cookies from 'js-cookie'

function Admin({props}) {

    const [data, setData] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {
        if (!data) {
            setData('loading')
            fetch('/backAdmin').then(response => {
                if (response.status === 200) {
                    response.json().then(newData => setData(newData))
                }
                else
                    setData(-1)
            })
        }
    })

    if (!data || data === 'loading')
        return <Loading />

    else if (data < 0)
        return <h1>{props.language.goAway}</h1>

    return (
        <section className="me-2">
            <Title title='Admin' />
            <div className="d-flex gap-3 mb-2">
                <h2 className="ps-3 text-decoration-underline fw-bold">Projets</h2>
                <button onClick={() => navigate('/admin/newProject')} type="button" className="btn btn-success">Nouveau projet</button>
            </div>
            <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.projects.length === 0 ?
                    <h3>Aucun projet</h3> :
                    data.projects.map(project => <Project key={project.id} navigate={navigate} project={project} />)
                }
            </div>
            <h2 className="ps-3 mt-3 text-decoration-underline fw-bold">Suggestions</h2>
            <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.suggestions.length === 0 ?
                    <h3>Aucune suggestion</h3> :
                    data.suggestions.map(suggestion => <Suggestion key={suggestion.authorId} navigate={navigate} suggestion={suggestion} />)
                }
            </div>
        </section>
    )

}

function Project({navigate, project}) {

    return (
        <div className="bg-secondary-subtle rounded p-2 d-flex justify-content-between">
            <h4>{project.name}</h4>
            <div className="d-flex gap-2">
                <button type='button' className="btn btn-secondary">Voir</button>
                <div className="position-relative">
                    {project.newMessage && <img className="newMessage" src="/images/circle-fill.svg" alt="" />}
                    <button type='button' className="btn btn-secondary">
                        Messages
                    </button>
                </div>
            </div>
        </div>
    )

}

function Suggestion({navigate, suggestion}) {

    return (
        <div className="bg-secondary-subtle rounded p-2 d-flex justify-content-between">
            <div className="d-flex gap-2 fs-4">
                {suggestion.name} || par <span type='button' className="text-primary text-decoration-underline">{suggestion.author}</span>
            </div>
            <div><button type='button' className="btn btn-secondary">Lire</button></div>
        </div>
    )

}

export function NewProject() {

    const navigate = useNavigate()
    const token = Cookies.get('csrftoken')

    const completeForm = () => {
        let formOk = true
        let inputs = ['title', 'description_fr', 'description_en']
        for (let input of inputs) {
            let frame = document.getElementById(input)
            if (frame.value === '') {
                frame.setAttribute('class', 'form-control border-3 border-danger')
                formOk = false
            }
        }
        return formOk
    }

    const sendImage = (id, input) => {
        const data = new FormData()
        data.set('image', input.files[0])
        fetch('/backAdmin/addImageToProject/' + id, {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : data
        }).then(response => {
            if (response.status !== 200)
                window.alert('Une erreur est survenue lors du chargement de l\'image')
        })
    }

    const send = () => {
        if (!completeForm())
            return
        let toSend = {
            title : document.getElementById('title').value,
            link : document.getElementById('GHLink').value,
            desc_fr : document.getElementById('description_fr').value,
            desc_en : document.getElementById('description_en').value
        }
        fetch('/backAdmin/newProject', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : JSON.stringify(toSend)
        }).then(response => {
            if (response.status === 201) {
                response.json().then(data => {
                    let input = document.getElementById('image')
                    if (input.files.length > 0)
                        sendImage(data.id, input)
                    // navigate('/projects/' + data.id)
                    window.confirm('GG !')
                })
            }
            else
                window.alert('Une erreur est survenue lors de l\'envoi des informations')
        })
    }

    const typing = e => document.getElementById(e.target.id).setAttribute('class', 'form-control border-2')

    return (
        <section className="me-2">
            <Title title="Nouveau projet" />
            <div className="w-100 d-flex justify-content-center">
                <form action="" className="w-50 d-flex flex-column ps-3 gap-2">
                        <label className="h3 fw-bold" htmlFor="title">Titre</label>
                        <input onKeyDown={typing} className="form-control border-2" type="text" name='title' id='title' />
                        <label className="h3 fw-bold" htmlFor="image">Image</label>
                        <input type="file" id='image' accept="image/*" />
                        <label className="h3 fw-bold mt-2" htmlFor="GHLink">Lien GitHub</label>
                        <input onKeyDown={typing} className="form-control border-2" type="text" name="GHLink" id="GHLink" />
                        <label className="h3 fw-bold" htmlFor="description_fr">Description (FR)</label>
                        <textarea onKeyDown={typing} className="form-control border-2" name="description_fr" id="description_fr"></textarea>
                        <label className="h3 fw-bold" htmlFor="description">Description (EN)</label>
                        <textarea onKeyDown={typing} className="form-control border-2" name="description_en" id="description_en"></textarea>
                        <button onClick={send} type="button" className="w-25 mt-2 align-self-center btn btn-secondary">Sauver</button>
                </form>
            </div>
        </section>
    )

}

export default Admin