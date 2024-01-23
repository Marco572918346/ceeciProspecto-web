import db from "../../../../database/models";

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return userList(req, res);
    case 'POST':
      return addUser(req, res);
    case 'PUT':
      return updateUser(req, res);
    case 'DELETE':
      return deleteUser(req, res);
    default:
      res.status(400).json({error: true, message: 'Peticion erronea'});
  }
}


// const userList = async (req, res) => {
//   try {
//     const users = await db.User.findAll();
//     return res.json(users);
    
//   } catch (error) {
//     return res.status(400).json(
//       {
//         error: true,
//         message: `Ocurrio un error al procesar la peticion: ${error.message}`
//       }
//     )
//   }
// }
const userList = async (req, res) => {
  try {
      //leer el Component a filtrar
      const { name, status } = req.query;

      //Proporcion de operadores
      const { Op } = require("sequelize");
      //leer los Component
      let users = [];
      if (name) {
          users = {
              [Op.or]: [{
                  name: {//[Op.like]: 'tra%'
                      [Op.like]: `%${name}%`,
                  },
              }],
          };
      }
      if (status) { 
          users = {
            ...users,
            status,
          };
        }

      const userss = await db.User.findAll({
          where: users,
          include: [
            {
              model: db.Status,
              as: 'userStatus',
    
              attributes: ['name']
            },
            {
              model: db.Course,
              as: 'course',
    
              attributes: ['name', 'area']
            }
          ]
      });

      return res.json(userss);
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

const addUser = async (req, res) => {
  try {
    // Desestructura los datos del cuerpo de la solicitud
    const { name, lastname, secondLastname, phone, email, address, status, area, observations } = req.body;

    // Crea un nuevo usuario en la base de datos
    const newUser = await db.User.create({
      name,
      lastname,
      secondLastname,
      phone,
      email,
      address,
      status,
      area,
      observations,
    });

    // Retorna una respuesta exitosa con el usuario creado
    res.status(200).json({
      user: newUser,
      message: 'El usuario fue registrado correctamente',
    });
  } catch (error) {
    // Verifica si el error es una validación de Sequelize
    if (error.name === 'SequelizeValidationError') {
      // Mapea los errores de validación y retorna mensajes específicos
      const validationErrors = error.errors.map((validationError) => ({
        field: validationError.path,
        message: validationError.message,
      }));

      return res.status(400).json({
        error: true,
        message: 'Error de validación',
        errors: validationErrors,
      });
    }

    // Si no es un error de validación de Sequelize, retorna un mensaje genérico
    return res.status(500).json({
      error: true,
      message: `Ocurrió un error al procesar la petición: ${error.message}`,
    });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const users = await db.User.update({...req.body},
      {
        where: {
          id
        }
      }
    )
    res.status(200).json(
      {
        users,
        message: 'El usuario fue actualizado correctamente'
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const users = await db.User.destroy({
      where: {
        id
      }
    })
    res.status(200).json(
      {
        users,
        message: 'El usuario fue eliminado correctamente'
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