import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loading, Title, validateForm } from "./Helpers"
import { useMediaQuery } from 'react-responsive'
import Cookies from 'js-cookie'

function Admin({props}) {

    const [data, setData] = useState(undefined)
    const [displayArticles, setDisplayArticles] = useState(false)
    const [displayProjects, setDisplayProjects] = useState(false)
    const [displaySugg, setDisplaySugg] = useState(false)
    const [displayArchived, setDisplayArchived] = useState(false)
    const [displayUsers, setDisplayUsers] = useState(false)
    const sm = useMediaQuery({query: '(max-width: 620px)'})

    useEffect(() => {
        if (!data) {
            setData('loading')
            fetch('/backAdmin').then(response => {
                if (response.status === 200)
                    response.json().then(newData => setData(newData))
                else
                    setData(-1)
            })
        }
    }, [data])

    useEffect(() => {
        if (!props.myProfile)
            setData(-1)
    }, [props.myProfile])

    if (!data || data === 'loading')
        return <Loading />

    else if (data < 0)
        return <h1>{props.language.goAway}</h1>

    let articleIndex = 0
    let projectIndex = 0
    let suggestIndex = 0
    let userIndex = 0

    return (
        <section className="me-2 overflow-auto noScrollBar" style={{height : '500px'}}>
            <Title title='Admin' />
            <div className="d-flex gap-2">
                <h2 className="ps-3 text-decoration-underline fw-bold">Utilisateurs</h2>
                <button onClick={() => setDisplayUsers(!displayUsers)} type="button" className="btn btn-success">Afficher la liste</button>
            </div>
            {displayUsers && <ul className="mt-2 list-group">{data.users.map(user => <User key={userIndex++} props={props} user={user} />)}</ul>}
            <hr />
            <div className={`d-flex gap-3 my-3 ${sm && 'flex-column'}`}>
                <h2 className="ps-3 text-decoration-underline fw-bold">Bio</h2>
                <div className="d-flex gap-2">
                    <button onClick={() => props.navigate('/admin/editBio')} type="button" className="btn btn-success">Editer la bio</button>
                    <button onClick={() => props.navigate('/bio')} type="button" className="btn btn-success">Voir la bio</button>
                </div>
            </div>
            <hr />
            <div className={`d-flex gap-3 mb-2 ${sm && 'flex-column'}`}>
                <h2 className="ps-3 text-decoration-underline fw-bold">Articles</h2>
                <div className="d-flex gap-2">
                    <button onClick={() => props.navigate('/admin/newArticle')} type="button" className="btn btn-success">Nouvel article</button>
                    <button onClick={() => setDisplayArticles(!displayArticles)} type="button" className="btn btn-success">Afficher la liste</button>
                </div>
            </div>
            {displayArticles && <div className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.articles.length === 0 ?
                    <h3>Aucun article</h3> :
                    data.articles.map(article => <Article key={article.id} props={props} article={article} index={articleIndex++} />)
                }
            </div>}
            <hr />
            <div className={`d-flex gap-3 mb-2 ${sm && 'flex-column'}`}>
                <h2 className="ps-3 text-decoration-underline fw-bold">Projets</h2>
                <div className="d-flex gap-2">
                    <button onClick={() => props.navigate('/admin/newProject')} type="button" className="btn btn-success">Nouveau projet</button>
                    <button onClick={() => setDisplayProjects(!displayProjects)} type="button" className="btn btn-success">Afficher la liste</button>
                </div>
            </div>
            {displayProjects && <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 pt-3">
                {data.projects.length === 0 ?
                    <h3>Aucun projet</h3> :
                    data.projects.map(project => <Project key={project.id} props={props} project={project} index={projectIndex++} />)
                }
            </div>}
            <hr />
            <div className={`d-flex gap-3 ${sm && 'flex-column'}`}>
                <h2 className="ps-3 text-decoration-underline fw-bold">Suggestions</h2>
                <div className="d-flex gap-2">
                    <button onClick={() => setDisplayArchived(!displayArchived)} type='button' className="btn btn-success">Afficher les archives</button>
                    <button onClick={() => setDisplaySugg(!displaySugg)} type="button" className="btn btn-success">Afficher la liste</button>
                </div>
            </div>
            {displaySugg && <div id="projectsAdmin" className="overflow-auto noScrollBar border rounded p-2 d-flex flex-column gap-2 mt-3">
                {data.suggestions.length === 0 || (!displayArchived && !data.suggestions.filter(sugg => !sugg.archived).length) ?
                    <h3>Aucune suggestion</h3> :
                    data.suggestions.map(suggestion => {
                        if (!suggestion.archived || displayArchived)
                            return <Suggestion key={suggestIndex} props={props} suggestion={suggestion} index={suggestIndex++} />
                        else
                            return undefined
                    })
                }
            </div>}
        </section>
    )

}

function User({props, user}) {

    return (
        <li type='button' className="list-group-item userList fw-bold" onClick={() => props.navigate('/profile/' + user.id)}>
            {user.name}
        </li>
    )

}

export function EditBio({props}) {

    const token = Cookies.get('csrftoken')

    useEffect(() => {
        if (document.getElementById('editBio_fr').value === '') {
            fetch('/backAdmin/getBio').then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        document.getElementById('editBio_fr').value = data.bio_fr
                        document.getElementById('editBio_en').value = data.bio_en
                    })
                }
                else
                    window.alert('Oups...')
            })
        }
    })

    const send = () => {
        let inputs = [document.getElementById('editBio_fr'), document.getElementById('editBio_en')]
        if (!validateForm([inputs], 'form-control'))
            return
        fetch('/backAdmin/editBio', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : JSON.stringify({
                bio_fr : inputs[0].value,
                bio_en : inputs[1].value
            })
        }).then(response => {
            if (response.status === 200)
                props.navigate('/bio')
            else
                window.alert('Oups...')
        })
    }

    return (
        <div className="me-2">
            <Title title='Edition bio' />
            <fieldset className="d-flex flex-column gap-2">
                <label htmlFor="editBio_fr">Français</label>
                <textarea className="form-control" rows='20' name="editBio_fr" id="editBio_fr"></textarea>
                <label htmlFor="editBio_en">Anglais</label>
                <textarea className="form-control" rows='20' name="editBio_en" id="editBio_en"></textarea>
                <span><button onClick={send} type='button' className="btn btn-secondary">Mettre à jour</button></span>
            </fieldset>
        </div>
    )

}

function Article({props, article, index}) {

    const sm = useMediaQuery({query: '(max-width: 620px)'})

    return (
        <div className={`rounded p-2 d-flex justify-content-between ${index % 2 === 0 ? 'bg-secondary-subtle' : 'bg-primary-subtle'} ${sm && 'flex-column align-items-center'}`}>
            <h4 className="text-dark">{article.title}</h4>
            <button onClick={() => props.navigate('/admin/editArticle/' + article.id)} type='button' className="btn btn-secondary">Editer</button>
        </div>
    )

}

function Project({props, project, index}) {

    const sm = useMediaQuery({query: '(max-width: 620px)'})

    return (
        <div className={`rounded p-2 d-flex justify-content-between ${index % 2 === 0 ? 'bg-secondary-subtle' : 'bg-primary-subtle'} ${sm && 'flex-column align-items-center'}`}>
            <h4 className="text-dark">{project.name}</h4>
            <div className={`d-flex gap-2 ${sm && 'flex-column gap-2'}`}>
                <button onClick={() => props.navigate('/project/' + project.id)} type='button' className="btn btn-secondary">Voir</button>
                <button onClick={() => props.navigate('/admin/editProject/' + project.id)} type='button' className="btn btn-secondary">Editer</button>
                <div className="position-relative">
                    {project.newMessage && <img className="newMessage" src="/images/circle-fill.svg" alt="" />}
                    <button type='button' className="btn btn-secondary w-100">
                        Commentaires
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
                {suggestion.name.concat(suggestion.archived ? ' (archivée)' : '')} || par <span onClick={() => props.navigate('/profile/' + suggestion.authorId)} type='button' className="text-primary text-decoration-underline">{suggestion.author}</span>
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
                props.navigate('/admin')
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
                    <input onKeyDown={typing} className="form-control border-2 w-25" type="text" name='title' id='title' defaultValue={type === 'edit' ? article.title : ''} style={{minWidth : '250px'}} />
                    <label className="h3 fw-bold" htmlFor="content_fr">Contenu (FR)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="content_fr" id="content_fr" defaultValue={type === 'edit' ? article.content_fr : ''}></textarea>
                    <label className="h3 fw-bold" htmlFor="content_en">Contenu (EN)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="content_en" id="content_en" defaultValue={type === 'edit' ? article.content_en : ''}></textarea>
                    <button onClick={send} type="button" className="w-25 mt-2 align-self-center btn btn-secondary">Sauver</button>
                    {type === 'edit' && <button onClick={del} type='button' className="w-25 align-self-center btn btn-danger">Supprimer l'article</button>}
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
            body : JSON.stringify(toSend)
        }).then(response => {
            if (response.status === 200 || response.status === 201) {
                response.json().then(data => props.navigate('/project/' + data.id))
            }
            else
                window.alert('Une erreur est survenue lors de l\'envoi des informations')
        })
    }

    const del = () => {
        if (window.confirm("T'es sûr ?")) {
            fetch('/backAdmin/editProject/' + id, {
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
                    <input onKeyDown={typing} className="form-control border-2 w-25" type="text" name='title' id='title' defaultValue={type === 'edit' ? project.name : ''} style={{minWidth : '250px'}} />
                    <label className="h3 fw-bold mt-2" htmlFor="GHLink">Lien GitHub</label>
                    <input className="form-control border-2 w-25" type="text" name="GHLink" id="GHLink" defaultValue={type === 'edit' ? project.link : ''} style={{minWidth : '250px'}} />
                    <label className="h3 fw-bold" htmlFor="description_fr">Description (FR)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="description_fr" id="description_fr" defaultValue={type === 'edit' ? project.desc_fr : ''}></textarea>
                    <label className="h3 fw-bold" htmlFor="description_en">Description (EN)</label>
                    {/* <CustomForm /> */}
                    <textarea onKeyDown={typing} rows='15' className="form-control border-2" name="description_en" id="description_en" defaultValue={type === 'edit' ? project.desc_en : ''}></textarea>
                    <button onClick={send} type="button" className="w-25 mt-2 align-self-center btn btn-secondary" style={{minWidth : '250px'}}>Sauver</button>
                    {type === 'edit' && <button onClick={makeCurrent} type='button' className="w-25 align-self-center btn btn-warning" style={{minWidth : '250px'}}>Projet en cours</button>}
                    {type === 'edit' && <button onClick={del} type='button' className="w-25 align-self-center btn btn-danger" style={{minWidth : '250px'}}>Supprimer le projet</button>}
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