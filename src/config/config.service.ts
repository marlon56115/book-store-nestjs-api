import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
   private readonly envConfig: { [key: string]: string };

   constructor() {
      const isDevelopmentEnv = process.env.NODE_ENV !== "production";

      //evalua si estoy en ambiente de desarrollo
      //true: obtengo el path del archivo de variables de entorno con la libreria fs
      //false: obtengo mi variable de entorno desde process.env que seria en produccion

      if (isDevelopmentEnv) {
         const envFilePath = __dirname + '/../../.env';
         const existPath = fs.existsSync(envFilePath);

         //evaluo si el archivo existe
         //true: lo informo
         //false: obtengo el archivo de variables de entorno y lo parseo a js con dotenv
         if (!existPath) {
            console.log('.env file dont exist');
            process.exit(0);
         } else {
            this.envConfig = parse(fs.readFileSync(envFilePath));
         }
      } else {
         this.envConfig = {
            PORT:process.env.PORT,
         }
      }
   }
   
   /**
    * para obtener una variable de entorno
    * @param key 
    * @returns 
    */
   get(key:string):string {
      return this.envConfig[key];
   }
}