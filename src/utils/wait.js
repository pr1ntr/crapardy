export default (duration = 1 /* seconds */) => new Promise((resolve) => {
    setTimeout(() => resolve(), duration * 1000)
})