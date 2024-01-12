//responsable de detectar el tipo de request 
import db from "../../../../database/models";


//e invocar a la funcion adecuada
export default function handler(req,res) {
    switch(req.method) {
        case 'GET':
            return coursesList(req, res);

        default:
            res.status(400).json({error: true, message: "Peticion errónea"})
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