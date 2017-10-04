import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from './modules/User/service';
const config = require('./config/env/config')();

export default function AuthConfig() {
    const UserService = new User();
    let opts = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
    };

    passport.use(new Strategy(opts, (jwtPayload, done) => {
        UserService
            .getById(jwtPayload.id)
            .then(user => {
                if(user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }
                return done(null, false);
            })
            .catch(error => {
                done(error, null)
            });
    }));

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', {session: false});
        }
    }
}