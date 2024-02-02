//responsable de detectar el tipo de request 
import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import db from "../../../../database/models";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

//e invocar a la funcion adecuada
export default async function handler(req,res) {

    await cors(req, res);

    switch(req.method) {
        case 'POST':
            return addStatus(req, res);
        case 'GET':
            return statusList(req, res);

        default:
            res.status(400).json({error: true, message: "Peticion errónea"})
    }
}

const addStatus = async (req, res) =>  {

    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
        const productos = await db.Status.create({...req.body});

        res.json({
            productos,
            message: 'El Status fue agregado correctamente'
        })
    }catch(error){
        console.log(error);
        let errors = []

        if(error.errors){
            //extrae la info
            errors = error.errors.map((item) => ({
                error: item.message, 
                field: item.path,
            }));
        }

        return res.status(400).json({
            message: `Ocurrió un error al procesar la petición: ${error.message}`,
            errors,
        })
    }
}

const statusList = async (req, res) => {
    try {
        //leer los Device
        let status = [];

        if(status) {
            status = await db.Status.findAll({
            })
        }


        return res.json(status);
    } catch(error) {
        console.log(error)
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la peticion: ${error.message}`        
            }
        )
    
    }
}