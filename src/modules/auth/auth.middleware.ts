import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const payload = await this.authService.verifyToken(token);
      if (payload) {
        req.body = payload;
        next();
      } else {
        res.status(401).json({ message: 'Token is not valid' });
      }
    } else {
      res.status(401).json({ message: 'Token not found' });
    }
  }
}
