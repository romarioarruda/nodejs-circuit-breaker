## Nodejs Circuit Breaker Test Case


**What is a circuit breaker?**
```
A Circuit breaker is a software engineering pattern to deal usualy with microservice solutions to avoid
cascading errors when we perform connection between two or more services.

This pattern prevents wasting of resources, time and consequently money once your application won't continue to hit requests that will possibly fail again.

The circuit breaker prevents that failing fast and early.
```

##

**How does a circuit breaker work?**
```
A circuit breaker has three defined states: Closed, Open and Half Open.

Taking the analogy of an usual electrical circuit, a Closed circuit has zero disturbance and currents can flow through it. Reather than, the current cannot flow through an Open circuit since there is at least one disturbance in the circuit's path. Like an incomplete circuit due to a cut wire.

When the circuit is Closed, the circuit breaker allows all requests go through. A Closed state means there are either no failures or only failures under acceptable limits.

When the failures exceed the acceptable limit, the circuit shifts to an Open state. Not allowing new requests go through it.

A Half Open state occurs after the circuit has been in the Open state for a predefined amount of time.
When in a Half Open state, the circuit allows a request go through to determine if the issue at the other end is resolved. If so, the circuit goes back to the Closed state and normal operations continue.
```

##

**Usefull Links**
- [Opossum Circuit Breaker](https://www.npmjs.com/package/opossum)
- [Abort Controller API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

##

**Bonuses**
- [Circuit Break with prometheus metrics](https://github.com/nodeshift/opossum-prometheus)

##

**Nodejs Version**
`v16.13.1`