import { Route, Routes } from "react-router-dom"
import Home from "./Home.jsx"
import Bio from "./Bio.jsx"
import Projects from "./Projects.jsx"

function Body({props}) {

    return (
        <div className="vw-100 d-flex justify-content-center">
            <div className="w-75 border">
                <Routes>
                    <Route path='/' element={<Home props={props} />} />
                    <Route path='/bio' element={<Bio props={props} />} />
                    <Route path='/projects' element={<Projects props={props} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Body