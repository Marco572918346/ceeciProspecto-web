//responsable de detectar el tipo de request 
import db from "../../../../database/models";


//e invocar a la funcion adecuada
export default function handler(req,res) {
    switch(req.method) {
        case 'POST': 
            return addRoll(req, res);
        case 'GET':
            return statusList(req, res);

        default:
            res.status(400).json({error: true, message: "Peticion errónea"})
    }
}

const addRoll = async (req, res) => {
    try {
      const dataUser = {...req.body}
      const users = await db.Roll.create(dataUser);
  
      res.status(200).json(
        {
          users,
          message: 'El rol fue registrado correctamente'
        }
      )
      
    } catch (error) {
      return res.status(400).json(
        {
          error: true,
          message: `Ocurrio un error al procesar la peticion: ${error.message}`
        }
      )
    }
  }

const statusList = async (req, res) => {
    try {
        //leer los Device
        let status = [];

        if(status) {
            status = await db.Roll.findAll({
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