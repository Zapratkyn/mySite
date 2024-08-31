import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
    }, [data, navigate])

    if (!data || data === 'loading')
        return <Loading />

    else if (data < 0)
        return <h1>{props.language.goAway}</h1>

    let projectIndex = 0
    let suggestIndex = 0

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
                    data.projects.map(project => <Project key={project.id} navigate={navigate} project={project} index={projectIndex++} />)
                }
            </div>
            <h2 className="ps-3 mt-3 text-decoration-underline fw-bold">Suggestions</h2>
            <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.suggestions.length === 0 ?
                    <h3>Aucune suggestion</h3> :
                    data.suggestions.map(suggestion => <Suggestion key={suggestion.authorId} navigate={navigate} suggestion={suggestion} index={suggestIndex++} />)
                }
            </div>
        </section>
    )

}

function Project({navigate, project, index}) {

    return (
        <div className={`rounded p-2 d-flex justify-content-between ${index % 2 === 0 ? 'bg-secondary-subtle' : 'bg-primary-subtle'}`}>
            <h4>{project.name}</h4>
            <div className="d-flex gap-2">
                <button onClick={() => navigate('/project/' + project.id)} type='button' className="btn btn-secondary">Voir</button>
                <button onClick={() => navigate('/admin/editProject/' + project.id)} type='button' className="btn btn-secondary">Editer</button>
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

function Suggestion({navigate, suggestion, index}) {

    return (
        <div className={`rounded p-2 d-flex justify-content-between ${index % 2 === 0 ? 'bg-primary-subtle' : 'bg-secondary-subtle'}`}>
            <div className="d-flex gap-2 fs-4">
                {suggestion.name} || par <span onClick={() => navigate('/profile/' + suggestion.authorId)} type='button' className="text-primary text-decoration-underline">{suggestion.author}</span>
            </div>
            <div><button onClick={() => navigate('/admin/readSuggestion/' + suggestion.id)} type='button' className="btn btn-secondary">Lire</button></div>
        </div>
    )

}

export function EditProject({type, props}) {

    const [project, setProject] = useState(type)
    const navigate = useNavigate()
    const token = Cookies.get('csrftoken')
    const id = useParams().id

    useEffect(() => {
        if (project === 'edit') {
            setProject('loading')
            fetch('/backAdmin/editProject/' + id).then(response => {
                if (response.status === 200)
                    response.json().then(data => setProject(data))
                else if (response.status === 403)
                    setProject(-1)
                else {
                    if (window.alert('Un problème est survenu'))
                        navigate('/')
                }
            })
        }
    }, [project, id, navigate])

    if (project === 'edit' || project === 'loading')
        return <Loading />

    else if (project < 0)
        return <h1>{props.language.goAway}</h1>

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
        fetch('/backAdmin/'.concat(type === 'new' ? 'newProject' : 'editProject/' + id), {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : JSON.stringify(toSend)
        }).then(response => {
            if (response.status === 200 || response.status === 201) {
                response.json().then(data => {
                    let input = document.getElementById('image')
                    if (input.files.length > 0)
                        sendImage(data.id, input)
                    navigate('/project/' + data.id)
                })
            }
            else
                window.alert('Une erreur est survenue lors de l\'envoi des informations')
        })
    }

    const del = () => {
        if (window.confirm("T'es sûr ?")) {
            fetch('/backAdmin/editProject' + id, {
                method : 'DELETE',
                headers: {'X-CSRFToken': token},
                mode : 'same-origin',
            }).then(response => {
                if (response.status === 200)
                    navigate('/admin')
                else
                    window.alert('Y a eu un couac...')
            })
        }
    }

    const typing = e => document.getElementById(e.target.id).setAttribute('class', 'form-control border-2')

    return (
        <section className="me-2">
            <Title title="Nouveau projet" />
            <div className="w-100 d-flex justify-content-center">
                <form action="" className="w-50 d-flex flex-column ps-3 gap-2">
                    <label className="h3 fw-bold" htmlFor="title">Titre</label>
                    <input onKeyDown={typing} className="form-control border-2" type="text" name='title' id='title' defaultValue={type === 'edit' ? project.name : ''} />
                    <label className="h3 fw-bold" htmlFor="image">Image</label>
                    <input type="file" id='image' accept="image/*" />
                    <label className="h3 fw-bold mt-2" htmlFor="GHLink">Lien GitHub</label>
                    <input onKeyDown={typing} className="form-control border-2" type="text" name="GHLink" id="GHLink" />
                    <label className="h3 fw-bold" htmlFor="description_fr">Description (FR)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} className="form-control border-2" name="description_fr" id="description_fr" defaultValue={type === 'edit' ? project.desc_fr : ''}></textarea>
                    <label className="h3 fw-bold" htmlFor="description">Description (EN)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} className="form-control border-2" name="description_en" id="description_en" defaultValue={type === 'edit' ? project.desc_en : ''}></textarea>
                    <button onClick={send} type="button" className="w-25 mt-2 align-self-center btn btn-secondary">Sauver</button>
                    {type === 'edit' && <button onClick={del} type='button' className="w-25 align-self-center btn btn-danger">Supprimer le projet</button>}
                </form>
            </div>
        </section>
    )

}

export default Admin