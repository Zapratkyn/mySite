export function getLanguage(language) {
    if (language === "fr")
        return French()
    return English()
}

function French() {
    return {
        home : 'Accueil',
        projects : 'Projets',
        currentProject : 'Projet en cours',
        progress : 'Etat d\'avancement',
        clickToSee : 'Cliquez pour voir la page',
        noPage : 'Cette page n\'existe pas. Veuillez vérifier l\'url et réessayer.',
        dev : 'Développeur',
        login : 'Connexion',
        logout : 'Déconnexion',
        signIn : 'Inscription',
        contact : 'Informations de contact',
        created : 'Créé le ',
        poll : 'Sondage',
        pollAsk : 'Que devrais-je faire ensuite ?'
    }
}

function English() {
    return {
        home : 'Home',
        projects : 'Projects',
        currentProject : 'Current project',
        progress : 'Completion',
        clickToSee : 'Click to see the page',
        noPage : 'This page does not exist. Please check url et try again.',
        dev : 'Developer',
        login : 'Log in',
        logout : 'Log out',
        signIn : 'Sign in',
        contact : 'Contact informations',
        created : 'Created : ',
        poll : 'Poll',
        pollAsk : 'What should I do next ?'
    }
}