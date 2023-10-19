import CircuitBreaker from "opossum"
import axios from "axios"

const abortController = new AbortController();
const circuitOptions = {
    abortController, //abort http request if needed
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
};

const makeRequest = async (abortSignal) => {
    const response = await axios.get('http://httpbin.org/delay/11', { signal: abortSignal })

    return response.data
}

const breaker = new CircuitBreaker(makeRequest, circuitOptions);
    
breaker.fire(abortController.signal).then(resp => console.log("RESPONSE: ", resp))

breaker.fallback((_param, error) => `route unavailable. ${error}`);
breaker.on('fallback', (result) => {
    //Here we can performe some retry police
    console.log("A fallback event occur. MSG:", result)
    console.log("Current state:", breaker.toJSON().state)
});