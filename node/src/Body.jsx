import { Route, Routes } from "react-router-dom"
import Home from "./Home.jsx"
import Bio from "./Bio.jsx"
import { Projects, ProjectPage } from "./Projects.jsx"
import { CurrentProject, Contact, Poll } from "./Widgets.jsx"
import NoPage from "./NoPage.jsx"
import Error from "./Error.jsx"
import { SignUp, SignIn, Suggest } from "./Forms.jsx"
import Admin from "./Admin.jsx"
import { EditArticle, EditProject, ReadSuggestion, EditBio } from "./Admin.jsx"
import { useMediaQuery } from 'react-responsive'
import { useState } from "react"
import Profile from "./Profile.jsx"

function Body({props}) {

    const lg = useMediaQuery({query: '(min-width: 769px)'})
    const md = useMediaQuery({query: '(max-width: 620px)'})
    const [displayWidgets, setDisplayWidgets] = useState(!md)

    return (
        <div className="w-100 d-flex align-items-center flex-column flex-grow-1">
            <Links lg={lg} />
            {md && <p type='button' onClick={() => setDisplayWidgets(!displayWidgets)} className="d-flex gap-1 bg-secondary-subtle rounded w-75 ps-1 fw-bold mt-3">
                    {props.language.displayWidgets}
                    <img src="/images/caret-down-fill.svg" alt="" />
                </p>}
            <div className={`p-3 d-flex gap-3 ${lg ? 'w-75' : 'w-100'} ${md && 'flex-column flex-column-reverse'}`}>
                <MainFrame props={props} md={md} />
                {(!md || displayWidgets) && <Widgets props={props} md={md} setDisplayWidgets={setDisplayWidgets} />}
            </div>
        </div>
    )
}

function Links({lg}) {
    return (
        <nav className={`d-flex gap-2 justify-content-end mt-3 pe-3 ${lg ? 'w-75' : 'w-100'}`} style={{listStyle : 'none'}}>
                <li>
                    <a href="https://www.linkedin.com/in/gilles-poncelet-b8a984a3" target='_blank' rel='noreferrer'>
                        <img src="/images/linkedin.png" alt="LinkedIn" style={{height : '30px'}} />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Zapratkyn" target='_blank' rel='noreferrer'>
                        <img src="/images/github.png" alt="GitHub" style={{height : '30px'}} />
                    </a>
                </li>
            </nav>
    )
}

function MainFrame({props, md}) {
    return (
        <main className={`p-2 ${md ? 'w-100' : 'border-end w-75'}`}>
            <Routes>
                <Route path='/' element={<Home props={props} />} />
                <Route path='/bio' element={<Bio props={props} />} />
                <Route path='/project' element={<Projects props={props} />} />
                <Route path="/project/:id" element={<ProjectPage props={props} />} />
                <Route path="/profile/:id" element={<Profile props={props} />} />
                <Route path='/suggest' element={<Suggest props={props} />} />
                <Route path='/signup' element={<SignUp props={props} />} />
                <Route path='/signin' element={<SignIn props={props} />} />
                <Route path='/error' element={<Error props={props} />} />
                <Route path='/admin' element={<Admin props={props} />} />
                <Route path='/admin/editBio' element={<EditBio props={props} />} />
                <Route path='/admin/newArticle' element={<EditArticle type='new' props={props} />} />
                <Route path='/admin/editArticle/:id' element={<EditArticle type='edit' props={props} />} />
                <Route path='/admin/newProject' element={<EditProject type='new' props={props} />} />
                <Route path='/admin/editProject/:id' element={<EditProject type='edit' props={props} />} />
                <Route path='/admin/suggestion/:id' element={<ReadSuggestion props={props} />} />
				<Route path="*" element={<NoPage props={props} />} />
            </Routes>
        </main>
    )
}

function Widgets({props, md, setDisplayWidgets}) {
    return (
        <div className={`d-flex flex-column gap-2 ${md ? 'w-100' : 'w-25 mt-3'}`}>
            <CurrentProject props={props} setDisplayWidgets={setDisplayWidgets} />
            <Contact props={props} setDisplayWidgets={setDisplayWidgets} />
            {/* <Poll props={props} /> */}
        </div>
    )
}

export default Body