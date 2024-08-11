export function getLanguage(language) {
    if (language === "fr")
        return French()
    return English()
}

function French() {
    return {
        home : 'Accueil',
        projects : 'Projets' 
    }
}

function English() {
    return {
        home : 'Home',
        projects : 'Projects'
    }
}