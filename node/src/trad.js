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
        allFieldsMandatory : 'Tous les champs sont obligatoires',
        noAccount : 'Pas de compte',
        signUpError_1 : 'Le format de l\'adresse e-mail est incorrect',
        signUpError_2 : 'Les mots de passe ne correspondent pas',
        signUpError_3 : 'Un compte associé à cette adresse e-mail existe déjà',
        signUpError_4 : 'Ce nom d\'utilisateur n\'est pas disponible',
        signUpError_5 : 'Tous les champs sont obligatoires',
        signUpError_6 : 'Une erreur s\'est produite lors de la création du compte',
        signUpError_7 : 'Une erreur s\'est produite lors de l\'authentification',
        signUpError_8 : 'Une erreur s\'est produite',
        signInError_1 : 'Vous êtes déjà connecté',
        signInError_2 : 'Nom d\'utilisateur ou mot de passe incorrect',
        signInError_3 : 'Une erreur s\'est produite',
        hello : 'Bonjour,',
        profile : 'Profil',
        noAccess : 'Tu n\'as rien à faire là.'
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
        allFieldsMandatory : 'All fields are mandatory',
        noAccount : 'No account',
        signUpError_1 : 'The email address format is incorrect',
        signUpError_2 : 'Passwords do not match',
        signUpError_3 : 'An account associated to this email address already exists',
        signUpError_4 : 'This username is not available',
        signUpError_5 : 'All fields are mandatory',
        signUpError_6 : 'An error occured while creating the account',
        signUpError_7 : 'An error occured during the authentification process',
        signUpError_8 : 'An error occured',
        signInError_1 : 'You are already logged in',
        signInError_2 : 'Incorrect username or password',
        signInError_3 : 'An error occured',
        hello : 'Hello,',
        profile : 'Profile',
        noAccess : 'You shouldn\'t be here'
    }
}