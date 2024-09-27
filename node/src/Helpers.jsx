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
    <div className="loading-container">
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

export function CustomForm({props}) {

  return (
    <div>
      <textarea name="customForm" id="customForm" placeholder="Insert text here"></textarea>
    </div>
  )

}

export function validateSignup(inputs, props) {

  let okay = true
  const nameRegex = /^[a-zA-Z0-9]*$/
  const passwordRegex = /^[a-zA-Z0-9-_#@:]*$/
  if (!nameRegex.test(inputs[0].value)) {
      inputs[0].setAttribute('class', 'form-control border border-3 border-danger w-50')
      document.getElementById('wrongName').innerHTML = props.language.invalidUsername
      okay = false
  }
  if (!passwordRegex.test(inputs[1].value)) {
      inputs[1].setAttribute('class', 'form-control border border-3 border-danger w-50')
      document.getElementById('wrongPW').innerHTML = props.language.invalidPW
      okay = false
  }
  for (let input of inputs) {
      if (input.value === '') {
          input.setAttribute('class', 'form-control border border-3 border-danger w-50')
          okay = false
      }
  }
  if (inputs[1].value !== inputs[2].value) {
      inputs[1].setAttribute('class', 'form-control border border-3 border-danger w-50')
      inputs[2].setAttribute('class', 'form-control border border-3 border-warning w-50')
      document.getElementById('noMatch').innerHTML = props.language.signUpError_2
      okay = false
  }
  else
      document.getElementById('noMatch').innerHTML = ''
  return okay

}

export function validateForm(inputs, attributeSet) {

  let okay = true

  for (let input of inputs) {
      if (input.value === '') {
          input.setAttribute('class', attributeSet +  'border border-3 border-danger')
          okay = false
      }
  }

  return okay

}

export function getMessage(prompt, myName) {

  let message = {
    type : 'message',
    target : 'chat',
    message : prompt
  }

  let error = {
    type : 'error',
    code : 3
  }

  if (prompt.substring(0, 2) === '/w') {
      message.type = 'whisp'
      prompt = prompt.substring(2)
      if (!prompt.length)
        return error
      let targetStart = 2
      while (prompt[targetStart] === ' ')
        targetStart++
      if (!prompt[targetStart])
        return error
      prompt = prompt.substring(targetStart - 1)
      let targetEnd = prompt.indexOf(' ')
      if (targetEnd < 0)
        return error
      message.target = prompt.substring(0, targetEnd)
      if (message.target === myName)
        return {...error, code : 4}
      message.message = prompt.substring(targetEnd + 1).trim()
      if (!message.message.length)
        return error
  }

  return message

}

function getQuotes(str, language) {

  let regex = /\[quote +[A-Za-z0-9]+ *\]\n*/
  let quote = str.match(regex)
  while (quote) {
    let tag = str.substring(quote.index, str.indexOf(']', quote.index) + 1)
    let i = 6
    while (tag[i] === ' ')
      i++
    let author = tag.substring(i)
    author = author.substring(0, author.match(/[ \]]/).index)
    str = str.replace(regex, "<br><span class='ms-3'>" + author + (language === 'fr' ? ' a écrit' : ' said') + "</span></br><p class='overflow-scroll noScrollBar rounded w-75 mx-3 bg-secondary-subtle p-2 border border-2 border-secondary fw-light mb-0'>")
    quote = str.match(regex)
  }
  return str

}

function getImages(str) {

  let regex = /\[image +.+ *]\n*/
  let image = str.match(regex)
  while (image) {
    let tag = str.substring(image.index, str.indexOf(']', image.index) + 1)
    let i = 6
    while (tag[i] === ' ')
      i++
    let src = tag.substring(i)
    src = src.substring(0, src.match(/[ \]]/).index)
    str = str.replace(regex, '<br><img class="w-100" src="' + src + '" alt=""/>')
    image = str.match(regex)
  }
  return str

}

export function getLinks(str) {

  let regex = /(?<![">/(image +)])(https:|http:|www\.)\S*/
  let match = str.match(regex)
  while (match) {
    let link = str.substring(match.index)
    let end = link.match(/[ \0\n\[]/)
    if (end)
      link = link.substring(0, end.index)
    str = str.substring(0, match.index) + '<a href="' + (link.substring(0, 4) === 'http' ? link : 'https://' + link) + '" target="_blank" rel="noreferrer">' + link + '</a>' + str.substring(match.index + link.length)
    match = str.match(regex)
  }
  return str

}

export function format(str, language) {

  str = str.replace(/<.[^<>]*>/g, '')
  str = getQuotes(str, language)
  str = getLinks(str)
  str = getImages(str)
  str = str.replace(/\[snippet\]\n*/g, "<pre><p class='overflow-scroll noScrollBar rounded w-75 mx-3 py-2 bg-secondary-subtle border border-2 border-secondary fw-light mb-0'>")
  str = str.replace(/\[center\]\n*/g, "<p class='d-flex justify-content-center'>")
  str = str.replace(/\[\/quote\]/g, '</p>')
  str = str.replace(/\[\/snippet\]/g, '</p></pre>')
  str = str.replace(/\[\/center\]/g, '</p>')
  str = str.replace(/\n/g, '<br>')
  return str

}