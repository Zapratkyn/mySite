import { useEffect, useState } from "react"
import { Title } from "./Helpers"

function Admin({props}) {
    
    const [page, setPage] = useState(undefined)

    useEffect(() => {
        if (!page) {
            fetch('/backAdmin').then(response => {
                if (response.status === 200)
                    setPage(page)
                else
                    setPage(<h3 className="fw-bold">You shouldn't be here</h3>)
            })
        }
    })

    return page

}

export default Admin