//responsable de detectar el tipo de request 
import db from "../../../../database/models";


//e invocar a la funcion adecuada
export default function handler(req,res) {
    switch(req.method) {
        case 'POST':
            return addArea(req, res);
        case 'GET':
            return coursesList(req, res);

        default:
            res.status(400).json({error: true, message: "Peticion errónea"})
    }
}

const addArea = async (req, res) =>  {

    try{
        //los datos vienen del req.body
        console.log(req.body);
        //guardar cliente
        const productos = await db.Course.create({...req.body});

        res.json({
            productos,
            message: 'El Curso fue agregado correctamente'
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

const coursesList = async (req, res) => {
    try {
        //leer los Device
        let courses = [];

        if(courses) {
            courses = await db.Course.findAll({
            })
        }


        return res.json(courses);
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