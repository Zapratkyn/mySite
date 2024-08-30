export function Title({title}) {

  return (
      <div className="d-flex align-items-center mb-2">
          <img className="h2" src="/images/caret-right.svg" alt="" />
          <h2 className="fw-bold">{title}</h2>
      </div>
  )
    
}

export function getCurrentPage() {

  let url = window.location.pathname

  if (url === '/' || url === '/bio')
    return url
  else if (url.includes('project'))
    return ('/project')
  return ''
  
}

export function Loading() {

  return (
    <div className="loading-container mt-5 pt-5">
      <div className="spinner"></div>
      <div className="loading-text">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        <div className="dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  )

}