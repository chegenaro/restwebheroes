import 'dotenv/config';
import { get} from 'env-var'; //* tomar el metodo get de env-var


export const envs = {

    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATh: get('PUBLIC_PATH').default('public').asString(),
    
}