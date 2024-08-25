export function Title({title}) {

    return (
        <div className="d-flex align-items-center mb-2">
            <img className="h2" src="caret-right.svg" alt="" />
            <h2 className="fw-bold">{title}</h2>
        </div>
    )
    
}

export function getCurrentPage() {

    let url = window.location.pathname
  
    if (url === '/' || url === '/bio')
      return url
    else if (url.includes('projects'))
      return ('/projects')
    return ''
  
  }