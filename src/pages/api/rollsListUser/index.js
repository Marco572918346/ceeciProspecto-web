import db from "../../../../database/models";

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return userList(req, res);
    case 'POST':
      return addUser(req, res);
    case 'PUT':
      return updateUser(req, res);
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
            attributes: ['id','status','name','lastname','secondLastname','area'],
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
      
      const mappedUsers = userss.map(user => {
        const fullName = `${user.name || ''} ${user.lastname || ''} ${user.secondLastname || ''}`.trim();
        const curso = `${course.name}`
        return {
          ...user.toJSON(),
          curso,
          fullName
        };
      });
      
        return res.json(mappedUsers);

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
    const dataUser = {...req.body}
    const users = await db.User.create(dataUser);

    res.status(200).json(
      {
        users,
        message: 'El usuario fue registrado correctamente'
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
