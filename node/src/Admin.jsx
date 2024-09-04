import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loading, Title } from "./Helpers"
import Cookies from 'js-cookie'

function Admin({props}) {

    const [data, setData] = useState(undefined)
    const [displayArchived, setDisplayArchived] = useState(false)

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
    }, [data])

    if (!data || data === 'loading')
        return <Loading />

    else if (data < 0)
        return <h1>{props.language.goAway}</h1>

    const allIsArchived = () => {
        let ret = true
        data.suggestions.map(suggestion => {
            if (!suggestion.archived)
                ret = false
        })
        return ret
    }

    let articleIndex = 0
    let projectIndex = 0
    let suggestIndex = 0

    return (
        <section className="me-2">
            <Title title='Admin' />
            <div className="d-flex gap-3 mb-2">
                <h2 className="ps-3 text-decoration-underline fw-bold">Articles</h2>
                <button onClick={() => props.navigate('/admin/newArticle')} type="button" className="btn btn-success">Nouvel article</button>
            </div>
            <div id="articlesAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.articles.length === 0 ?
                    <h3>Aucun article</h3> :
                    data.articles.map(article => <Article key={article.id} props={props} article={article} index={articleIndex++} />)
                }
            </div>
            <div className="d-flex gap-3 mb-2 mt-3">
                <h2 className="ps-3 text-decoration-underline fw-bold">Projets</h2>
                <button onClick={() => props.navigate('/admin/newProject')} type="button" className="btn btn-success">Nouveau projet</button>
            </div>
            <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.projects.length === 0 ?
                    <h3>Aucun projet</h3> :
                    data.projects.map(project => <Project key={project.id} props={props} project={project} index={projectIndex++} />)
                }
            </div>
            <h2 className="ps-3 mt-3 text-decoration-underline fw-bold">Suggestions</h2>
            <button onClick={() => setDisplayArchived(!displayArchived)} type='button' className="btn btn-secondary ms-3 mb-2">Afficher les archives</button>
            <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.suggestions.length === 0 || allIsArchived() ?
                    <h3>Aucune suggestion</h3> :
                    data.suggestions.map(suggestion => {
                        if (!suggestion.archived || displayArchived)
                            return <Suggestion key={suggestIndex} props={props} suggestion={suggestion} index={suggestIndex++} />
                        else
                            return undefined
                    })
                }
            </div>
        </section>
    )

}

function Article({props, article, index}) {

    return (
        <div className={`rounded p-2 d-flex justify-content-between ${index % 2 === 0 ? 'bg-secondary-subtle' : 'bg-primary-subtle'}`}>
            <h4>{article.title}</h4>
            <button onClick={() => props.navigate('/admin/editArticle/' + article.id)} type='button' className="btn btn-secondary">Editer</button>
        </div>
    )

}

function Project({props, project, index}) {

    return (
        <div className={`rounded p-2 d-flex justify-content-between ${index % 2 === 0 ? 'bg-secondary-subtle' : 'bg-primary-subtle'}`}>
            <h4>{project.name}</h4>
            <div className="d-flex gap-2">
                <button onClick={() => props.navigate('/project/' + project.id)} type='button' className="btn btn-secondary">Voir</button>
                <button onClick={() => props.navigate('/admin/editProject/' + project.id)} type='button' className="btn btn-secondary">Editer</button>
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

function Suggestion({props, suggestion, index}) {

    return (
        <div className={`rounded p-2 d-flex justify-content-between ${!suggestion.archived ? index % 2 === 0 ? 'bg-primary-subtle' : 'bg-secondary-subtle' : 'bg-warning'}`}>
            <div className="d-flex gap-2 fs-4">
                {suggestion.name.concat(suggestion.archived ? ' (archived)' : '')} || par <span onClick={() => props.navigate('/profile/' + suggestion.authorId)} type='button' className="text-primary text-decoration-underline">{suggestion.author}</span>
            </div>
            <div><button onClick={() => props.navigate('/admin/suggestion/' + suggestion.id)} type='button' className="btn btn-secondary">Lire</button></div>
        </div>
    )

}

export function EditArticle({type, props}) {

    const [article, setArticle] = useState(type)
    const token = Cookies.get('csrftoken')
    const id = useParams().id

    useEffect(() => {
        if (article === 'edit') {
            setArticle('loading')
            fetch('/backAdmin/editArticle/' + id).then(response => {
                if (response.status === 200)
                    response.json().then(data => setArticle(data))
                else if (response.status === 403)
                    setArticle(-1)
                else {
                    if (window.alert('Un problème est survenu'))
                        props.navigate('/')
                }
            })
        }
    }, [article, id, props])

    if (article === 'edit' || article === 'loading')
        return <Loading />

    else if (article < 0)
        return <h1>{props.language.goAway}</h1>

    const completeForm = () => {
        let formOk = true
        let inputs = ['title', 'content_fr', 'content_en']
        for (let input of inputs) {
            let frame = document.getElementById(input)
            if (frame.value === '') {
                frame.setAttribute('class', 'form-control border-3 border-danger')
                formOk = false
            }
        }
        return formOk
    }

    const send = () => {
        if (!completeForm())
            return
        let toSend = {
            title : document.getElementById('title').value,
            content_fr : document.getElementById('content_fr').value,
            content_en : document.getElementById('content_en').value
        }
        fetch('/backAdmin/'.concat(type === 'new' ? 'newArticle' : 'editArticle/' + id), {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : JSON.stringify(toSend)
        }).then(response => {
            if (response.status === 200 || response.status === 201)
                props.navigate('/')
            else
                window.alert('Une erreur est survenue lors de l\'envoi des informations')
        })
    }

    const del = () => {
        if (window.confirm("T'es sûr ?")) {
            fetch('/backAdmin/editArticle' + id, {
                method : 'DELETE',
                headers: {'X-CSRFToken': token},
                mode : 'same-origin',
            }).then(response => {
                if (response.status === 200)
                    props.navigate('/admin')
                else
                    window.alert('Y a eu un couac...')
            })
        }
    }

    const typing = e => document.getElementById(e.target.id).setAttribute('class', 'form-control border-2')

    return (
        <section className="me-2">
            <Title title="Nouvel article" />
            <form action="" className="w-100 d-flex flex-column align-items-center ps-3 gap-2">
                {/* <fieldset> */}
                    <label className="h3 fw-bold" htmlFor="title">Titre</label>
                    <input onKeyDown={typing} className="form-control border-2 w-25" type="text" name='title' id='title' defaultValue={type === 'edit' ? article.title : ''} />
                    <label className="h3 fw-bold" htmlFor="content_fr">Contenu (FR)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="content_fr" id="content_fr" defaultValue={type === 'edit' ? article.content_fr : ''}></textarea>
                    <label className="h3 fw-bold" htmlFor="content_en">Contenu (EN)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="content_en" id="content_en" defaultValue={type === 'edit' ? article.content_en : ''}></textarea>
                    <button onClick={send} type="button" className="w-25 mt-2 align-self-center btn btn-secondary">Sauver</button>
                    {type === 'edit' && <button onClick={del} type='button' className="w-25 align-self-center btn btn-danger">Supprimer le projet</button>}
                {/* </fieldset> */}
            </form>
        </section>
    )

}

export function EditProject({type, props}) {

    const [project, setProject] = useState(type)
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
                        props.navigate('/')
                }
            })
        }
    }, [project, id, props])

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
                    props.navigate('/project/' + data.id)
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
                    props.navigate('/admin')
                else
                    window.alert('Y a eu un couac...')
            })
        }
    }

    const makeCurrent = () => {
        fetch('/backAdmin/makeCurrent/' + id, {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin'
        }).then(response => {
            if (response.status === 200)
                props.navigate('/project/' + id)
            else
                window.alert('Une erreur est survenue')
        })
    }

    const typing = e => document.getElementById(e.target.id).setAttribute('class', 'form-control border-2')

    return (
        <section className="me-2">
            <Title title="Nouveau projet" />
            <form action="" className="w-100 d-flex flex-column align-items-center ps-3 gap-2">
                {/* <fieldset> */}
                    <label className="h3 fw-bold" htmlFor="title">Titre</label>
                    <input onKeyDown={typing} className="form-control border-2 w-25" type="text" name='title' id='title' defaultValue={type === 'edit' ? project.name : ''} />
                    <div className="d-flex flex-column">
                        <label className="h3 fw-bold" htmlFor="image">Image</label>
                        <input type="file" id='image' accept="image/*" />
                    </div>
                    <label className="h3 fw-bold mt-2" htmlFor="GHLink">Lien GitHub</label>
                    <input className="form-control border-2 w-25" type="text" name="GHLink" id="GHLink" defaultValue={type === 'edit' ? project.link : ''} />
                    <label className="h3 fw-bold" htmlFor="description_fr">Description (FR)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="description_fr" id="description_fr" defaultValue={type === 'edit' ? project.desc_fr : ''}></textarea>
                    <label className="h3 fw-bold" htmlFor="description_en">Description (EN)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="description_en" id="description_en" defaultValue={type === 'edit' ? project.desc_en : ''}></textarea>
                    <button onClick={send} type="button" className="w-25 mt-2 align-self-center btn btn-secondary">Sauver</button>
                    {type === 'edit' && <button onClick={makeCurrent} type='button' className="w-25 align-self-center btn btn-warning">Projet en cours</button>}
                    {type === 'edit' && <button onClick={del} type='button' className="w-25 align-self-center btn btn-danger">Supprimer le projet</button>}
                {/* </fieldset> */}
            </form>
        </section>
    )

}

export function ReadSuggestion({props}) {

    const [sugg, setSugg] = useState(undefined)
    const token = Cookies.get('csrftoken')
    const id = useParams().id

    useEffect(() => {
        if (!sugg) {
            fetch('/backAdmin/readSuggestion/' + id).then(response => {
                if (response.status === 200)
                    response.json().then(data => setSugg(data))
                else
                    setSugg(-1)
            })
        }
    })

    const read = () => {
        fetch('/backAdmin/markAsRead/' + id, {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin'
        }).then(response => {
            if (response.status === 200)
                props.navigate('/admin')
            else
                window.alert('Un problème est survenu')
        })
    }

    if (!sugg)
        return <Loading />

    else if (sugg < 0)
        return <h1>Une erreur est survenue</h1>

    const author = <span type='button' className="text-primary text-decoration-underline fs-4" onClick={() => props.navigate('/profile/' + sugg.authorId)}>{sugg.author}</span>
 
    return (
        <section className="me-2">
            <h2>{sugg.title}</h2>
            <p className="border rounded p-2" style={{minHeight : '100px'}}>{sugg.content}</p>
            <p className="ps-3">Par {author}</p>
            <button onClick={read} type='button' className="btn btn-success">Marquer comme lu</button>
        </section>
    )

}

export default Admin