import { RateLimiterMemory } from 'rate-limiter-flexible';
import express, { Request, Response, NextFunction } from 'express';

const rateLimiter = new RateLimiterMemory({
    points: 10, // maximum number of requests allowed
    duration: 1, // time frame in seconds
});

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            // request allowed, 
            // proceed with handling the request
            next();
        })
        .catch(() => {
            // request limit exceeded, 
            // respond with an appropriate error message
            res.status(429).send('Too Many Requests');
        });
};
