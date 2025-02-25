const { body, validationResult } = require('express-validator');

// Règles de validation pour le formulaire
const uploadValidationRules = [
    // Validation du nom
    body('name')
        .trim()
        .notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 2, max: 50 }).withMessage('Le nom doit contenir entre 2 et 50 caractères')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/).withMessage('Le nom contient des caractères non autorisés'),

    // Validation de l'email
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Format d\'email invalide')
        .normalizeEmail()
];

// Middleware de validation
const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // S'il y a des erreurs, renvoyer la première
        const firstError = errors.array()[0];
        
        // Si c'est une requête AJAX/API, renvoyer du JSON
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(400).json({ error: firstError.msg });
        }
        
        // Pour une requête normale, réafficher le formulaire avec l'erreur
        return res.status(400).render('index', {
            title: 'Erreur de Validation',
            error: firstError.msg,
            oldInput: req.body
        });
    }
    
    next();
};

module.exports = {
    uploadValidationRules,
    validate
};