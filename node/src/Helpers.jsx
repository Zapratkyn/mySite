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

export function format(str) {

  let regex = /\n/g
  let result = str.replace(regex, '<br>')
  return result

}