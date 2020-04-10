import express from 'express';
import {getUserFromToken} from "../../user/services/get-user-from-token";
import {getManager} from "typeorm";

export async function authenticationMiddleware(req: express.Request, res: express.Response, next) {
  try {
    const token = req.header('token') || req.header('authorization') || req.cookies.token;
    if (!token) {
      return;
    }
    res.locals.user = await getUserFromToken(token, getManager());
  } catch (e) {
    console.error('auth error', e);
  } finally {
    next();
  }
}
