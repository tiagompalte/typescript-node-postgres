import { Request, Response } from "express";
import AuthorController from './controller';

class AuthorRoutes {

    index(req: Request, res: Response) {
        return AuthorController.getAll(req, res)
    }

    create(req: Request, res: Response) {
        return AuthorController.createAuthor(req, res)
    }

    findOne(req: Request, res: Response) {
        return AuthorController.getById(req, res)
    }

    update(req: Request, res: Response) {
        return AuthorController.updateAuthor(req, res)
    }

    destroy(req: Request, res: Response) {
        return AuthorController.deleteAuthor(req, res)
    }
}

export default new AuthorRoutes()