'use strict'

function checkThemes() {
  const theme = localStorage.getItem('general-theme')

  if (theme)
    setTheme(theme)
  else
    setTheme('light')

  const codeTheme = localStorage.getItem('code-theme')

  if (codeTheme)
    setCodeTheme(codeTheme)
  else
    setCodeTheme('monokailight')
}

function setTheme(theme) {
  document.body.dataset.theme = theme
  localStorage.setItem('general-theme', theme)
}

function setCodeTheme(theme) {
  document.body.dataset.codeTheme = theme
  localStorage.setItem('code-theme', theme)
}

export {
  checkThemes,
  setTheme,
  setCodeTheme,
}

