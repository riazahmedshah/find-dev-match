import { Response } from "express";
import { ZodIssue } from "zod";

export class ResponseHandler{
  static async json(res:Response, data:Record<string, any>, status=200){
    if(data){
      res.status(status).json(data)
    } else{
      res.status(status).send()
    }
  }

  static async created(res:Response, data:Record<string, unknown>){
    ResponseHandler.json(res, data,201)
  }

  static unauthorized(res: Response) {
    res.status(401).send('Unauthorized')
  }

  static notFound(res: Response, message?: string) {
    res.status(404).send(message || 'Not Found')
  }

  static zodError(res:Response, issues:ZodIssue[]){
    const error = issues.reduce((acc: Record<string,string>, issue) => {
      const key = issue.path.join(".")
      acc[key] = issue.message

      return acc;
    },{});

    res.status(400).json({ error })
  }

  static error(res:Response, error:unknown){
    if(error instanceof Error){
      ResponseHandler.json(res, error,400)
    } else{
      ResponseHandler.json(res, {
        Error:"INTERNAL_SERVER_ERROR"
      },500)
    }
  }
}