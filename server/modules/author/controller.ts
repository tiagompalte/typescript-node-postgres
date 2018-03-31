import { Request, Response } from "express";
import handlers from "../../api/responses/handlers";
import * as _ from "lodash";
import Author from './service'

class AuthorController {
    
    getAll(req: Request, res: Response) {
        Author
            .getAll()
            .then(_.partial(handlers.onSuccess, res))
            .catch(_.partial(handlers.onError, res, `Erro ao buscar todos autores`))
    }

    createAuthor(req: Request, res: Response) {
        Author
            .create(req.body)
            .then(_.partial(handlers.onSuccess, res))
            .catch(_.partial(handlers.dbErrorHandler, res))
            .catch(_.partial(handlers.onError, res, `Erro ao inserir novo autor`))
    }

    getById(req: Request, res: Response) {
        const authorId = parseInt(req.params.id)
        Author
            .getById(authorId)
            .then(_.partial(handlers.onSuccess, res))
            .catch(_.partial(handlers.onError, res, `Erro ao buscar autor`))
    }

    updateAuthor(req: Request, res: Response) {
        const authorId = parseInt(req.params.id)
        const props = req.body 
        Author
            .update(authorId, props)
            .then(_.partial(handlers.onSuccess, res))
            .catch(_.partial(handlers.onError, res, `Erro ao atualizar autor`))
    }

    deleteAuthor(req: Request, res: Response) {
        const authorId = parseInt(req.params.id)
        Author
            .delete(authorId)
            .then(_.partial(handlers.onSuccess, res))
            .catch(_.partial(handlers.onError, res, `Erro ao excluir autor`))
    }
}

export default new AuthorController()