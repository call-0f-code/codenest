import "express";
import {MulterFile} from 'multer';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            file?: MulterFile;
        }
    }
}