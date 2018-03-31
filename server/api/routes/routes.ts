import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/User/routes';
import TokenRoutes from '../../modules/auth/auth';
import AuthorRoutes from '../../modules/author/routes'

class Routes {

    constructor() {}

    initRoutes(app: Application, auth: any): void {
        app.route('/api/users/all').all(auth.config().authenticate()).get(UserRoutes.index);
        app.route('/api/users/create').all(auth.config().authenticate()).post(UserRoutes.create);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(UserRoutes.findOne);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(UserRoutes.update);
        app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(UserRoutes.destroy);
        app.route('/token').post(TokenRoutes.auth);

        app.route('/api/author/all').all(auth.config().authenticate()).get(AuthorRoutes.index);
        app.route('/api/author/create').all(auth.config().authenticate()).post(AuthorRoutes.create);
        app.route('/api/author/:id').all(auth.config().authenticate()).get(AuthorRoutes.findOne);
        app.route('/api/author/:id/update').all(auth.config().authenticate()).put(AuthorRoutes.update);
        app.route('/api/author/:id/destroy').all(auth.config().authenticate()).delete(AuthorRoutes.destroy);
    }

}

export default new Routes();
