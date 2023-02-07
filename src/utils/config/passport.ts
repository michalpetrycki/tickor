import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './config';
import tokenTypes from './token';
import PersonModel from '@/resources/person/person.model';
import { Identifier } from 'sequelize';

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = async (payload: { type: string; sub: Identifier | undefined; }, done: (arg0: unknown, arg1: boolean | PersonModel) => void) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await PersonModel.findByPk(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export default jwtStrategy;
