import { getLanguage } from "./trad"

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

  export function handleMessage(e, setMyProfile, messages, setMessages, setLanguage) {

    let data = JSON.parse(e.data)
    console.log(data)
    if (Object.keys(data).includes('language')) {
      setLanguage(getLanguage(data.language))
      setMyProfile(data)
    }
    else
      setMessages([...messages, data])

  }