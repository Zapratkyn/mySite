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
        noPage : 'Cette page n\'existe pas. Veuillez vérifier l\'url et réessayer.',
        dev : 'Développeur',
        login : 'Connexion',
        logout : 'Déconnexion',
        signIn : 'Inscription',
        contact : 'Informations de contact',
        created : 'Créé le ',
        poll : 'Sondage',
        pollAsk : 'Que devrais-je faire ensuite ?',
        suggest : 'Une idée à proposer ?',
        suggestHead : 'Vous avez une idée de projet à me proposer ? Ou un défi à me lancer ? C\'est ici que ça se passe.',
        suggestTitle : 'Donnez-lui un titre accrocheur',
        suggestDetails : 'Décrivez votre concept génial',
        suggestSend : 'Proposer',
        suggestLoggedOut : 'Vous devez vous connecter pour soumettre une idée',
        alreadySuggested : 'Vous avez déjà proposé quelque chose aujourd\'hui',
        chatOn : 'Dites un truc sympa',
        chatOff : 'Connectez-vous pour utiliser le chat',
        bio1 : 'Mon nom est Gilles Poncelet. Et ceci est mon site Web.',
        bio2 : 'Je suis né le 13 janvier 1989 à Etterbeek, en Belgique.',
        bio3 : 'Enfant de parents artistes, je me suis moi-même intéressé très tôt à la musique et au théâtre.',
        bio4 : '',
        noProject : 'Ce projet n\'existe pas. Vérifiez l\'url et réessayez.',
        seeOnGH : 'Voir sur GitHub'
    }
}

function English() {
    return {
        home : 'Home',
        projects : 'Projects',
        currentProject : 'Current project',
        progress : 'Completion',
        noPage : 'This page does not exist. Please check url and try again.',
        dev : 'Developer',
        login : 'Log in',
        logout : 'Log out',
        signIn : 'Sign in',
        contact : 'Contact informations',
        created : 'Created : ',
        poll : 'Poll',
        pollAsk : 'What should I do next ?',
        suggest : 'A new idea ?',
        suggestHead : 'You have a project idea to submit ? Or a challenge for me ? Here is where you can describe it.',
        suggestTitle : 'Give it a catchy title',
        suggestDetails : 'Describe your brilliant concept',
        suggestSend : 'Suggest',
        suggestLoggedOut : 'You need to be logged in to submit an idea',
        alreadySuggested : 'You already suggested something today',
        chatOn : 'Say something nice',
        chatOff : 'Log in to use the chat',
        bio1 : 'My name is Gilles Poncelet. And this is my website.',
        noProject : 'This project does not exist. Check url and try again.',
        seeOnGH : 'See on GitHub'
    }
}