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
        signIn : 'Connexion',
        logout : 'Déconnexion',
        signUp : 'Inscription',
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
        seeOnGH : 'Voir sur GitHub',
        username : 'Nom d\'utilisateur',
        password : 'Mot de passe',
        passwordConfirm : 'Confirmation du mot de passe',
        connexion : 'Se connecter',
        signInError : 'Nom d\'utilisateur ou mot de passe incorrect',
        createAccount : 'Créer un compte',
        passwordConfirmError : 'Les mots de passe ne correspondent pas',
        allFieldsMandatory : 'Tous les champs sont obligatoires',
        noAccount : 'Pas de compte'
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
        signIn : 'Sign in',
        logout : 'Log out',
        signUp : 'Sign up',
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
        seeOnGH : 'See on GitHub',
        username : 'Username',
        password : 'Password',
        passwordConfirm : 'Password confirmation',
        connexion : 'Log in',
        signInError : 'Wrong username or password',
        createAccount : 'Create an account',
        passwordConfirmError : 'Passwords do not match',
        allFieldsMandatory : 'All fields are mandatory',
        noAccount : 'No account'
    }
}