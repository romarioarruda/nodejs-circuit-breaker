import CircuitBreaker from "opossum"
import axios from "axios"

const makeRequest = async (abortSignal) => {
    console.log("abortSignal: ", abortSignal)
    try {
        const response = await axios.get('http://httpbin.org/delay/5', { signal: abortSignal })

        console.log("HTTP Response: ", response.data)
    } catch(error) {
        console.error("HTTP Request Error: ", String(error))
    }
}

const abortController = new AbortController();

const options = {
    abortController, //abort http request if needed
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
};

const breaker = new CircuitBreaker(makeRequest, options);

breaker.fire(abortController.signal)

breaker.fallback((param, error) => `Sorry, out of service right now. ${error}`);
breaker.on('fallback', (result) => {
    //Here we can performe some retry police
    console.log("A fallback event occur. MSG:", result)
    console.log("Current state:", breaker.toJSON().state)
});
