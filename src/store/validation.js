function validateOrder(order) {
    if (!validateBrand(order.brand) || !validateEmail(order.contact.email) ||
        order.contact.name === '' || order.contact.phone === '' || order.projectName === '' || 
        order.projectType === '' || order.platforms === '' || order.format === '') 
            return false
    return true
}

function validateBrand(brand) {
    let urlPattern = /\.\S{1,24}$/
    if (brand.name.length > 1 & urlPattern.test(brand.url)) return true
    return false
}

function validateEmail(email) {
    let pattern = /^\S+@\S+\.\S{1,24}$/
    return (pattern.test(email) && (email.length >= 8 && email.length <= 32))
}

function validatePassword(password) {
    let length = /^\S{8,32}$/
    let complexity = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/
    let numbers = /\d+/
    let letters = /[a-zA-Z]+/
    return (length.test(password) && complexity.test(password) && numbers.test(password) && letters.test(password))
}

function validateDisplayName(displayName) {
    return displayName.length >= 2
}

function validateUser(user) {
    if (validateEmail(user.email) && validateDisplayName(user.displayName)) return true
    return false
}

export { validateBrand, validateDisplayName, validateEmail, validateOrder, validatePassword, validateUser }