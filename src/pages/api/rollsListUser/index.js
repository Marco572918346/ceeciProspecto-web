import Cors from 'cors';
import initMiddleware from '../../../../lib/init-middleware';
import db from "../../../../database/models";

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

export default async function handler(req, res) {

  await cors(req, res);

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
        const course = `${user.course.name} ${user.course.area}`;
        const status = `${user.userStatus.name}`
        return {
          ...user.toJSON(),
          course,
          fullName,
          status
        };
      })
      .filter(record => record.status == 'Prospecto');
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
