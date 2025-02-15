/**
 * @param {Function} func
 * @param {number} wait
 */
export function throttle (func, wait) {
    let timer = null
    let stashed = null

    const startCooling = () => {
        timer = window.setTimeout(check, wait)
    }

    const check = () => {
        timer = null
        if (stashed !== null) {
            func.apply(stashed[0], stashed[1])
            stashed = null
            startCooling()
        }
    }

    return function(...args) {
        if (timer !== null) {
            // cooling, stash it
            stashed = [this, args]
        } else {
            func.apply(this, args)
            startCooling()
        }
    }
}


export function throttle2(mainFunction, delay) {
    let timerFlag = null; // Variable to keep track of the timer

    // Returning a throttled version
    return (...args) => {
        if (timerFlag === null) { // If there is no timer currently running
            mainFunction(...args); // Execute the main function
            timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
                timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
            }, delay);
        }
    };
}
