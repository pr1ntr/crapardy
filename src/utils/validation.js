
export const validateRequired = value => value ? undefined : 'This field is required.'
export const validateEmail = value => value && /^[a-zA-Z0-9-_\.\+]+@[a-zA-Z0-9-_\.]+\.[\w]{2,}/gi.test(value) ? undefined : 'This is not a valid e-mail address.'
export const validateLength = min => value => value && value.length >= min ? undefined : `Value must be at least ${min} characters.`
export const validateNumber = value => /^(\d+)?([.]?\d*)?$/gi.test(value) ? undefined : 'Must be a number'

export const compareToInput = input => value => value && value === input.value ? undefined : 'Does not match.'