import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from 'multer'
import { Constants } from "src/base/constants/constants";



export const multerOption: MulterOptions = {
    limits: {
        fileSize: 3 * 1024
    },
    fileFilter: (req: Request, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            cb(null, true)
        } else {
            //poner la excepcion aqui cuando ponga el tipo de 
            //retorno generico y los errores
            cb("opner la excepcion", false)
        }
    },
    storage: diskStorage({
        destination: Constants.BASE_PATH_FILE,
        filename: (req: any, file: any, cb: any) => {
            const randomName: string = Date.now().toString() + file.originalname;
            cb(null, randomName)
        }
    })

}