const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateVoteInput(data) {
    let errors = {};
    data.id = !isEmpty(data.id) ? data.id : '';
    data.vote = !isEmpty(data.id) ? data.vote : '';

    if(Validator.isEmpty(data.id)) {
        errors.name = 'Id field is required';
    }

    // if(Validator.isEmpty(data.vote)) {
    //     errors.name = 'Vote field is required';
    // }
    // if(Validator.isNumeric(data.vote)) {
    //     errors.name = 'Vote field is not Number';
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
