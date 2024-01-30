import db from "../../../../database/models"

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getRollList(req, res);
        case 'POST':
            return addRollList(req, res);
        default:
            res.status(400).json({error: true, message: "Peticion errónea"})
    }
}

const getRollList = async (req, res) => {

    try{
            const data = await db.RollList.findAll({
                    include: [{
                        model: db.User,
                        as: 'rools',
                        attributes: ['name', 'lastname', 'secondLastname'],
                    include: [{
                        model: db.Status,
                        as: 'userStatus',
                        attributes: ['name'],
                    }],
                }],
            });
            const newData = data.map(roll => {
                const user = roll.roll; //acceder a la instancia de User relacionada
                const status = user ? user.userStatus: null ;

                    if (!user){
                        return {
                            ...roll.toJSON(),
                            fullName: 'N/A',
                            statusInfo: 'N/A',
                        };
                    }
                //concatenar los atributos
                const fullName = `${user.name} ${user.lastname} ${user.secondLastname}`;
                //retornar fullName
                return{
                    ...roll.toJSON(),
                    fullName,
                    statusInfo: status ? status.name : 'N/A',
                };
            })
            .filter(record => record.statusInfo !== 'Rechazado');
            return res.json(newData);

    }catch(error){
        console.log(error);
            return res.status(400).json(
                {
                    error:true,
                    message: `Surgio un error al procesar la peticion ${error.message}`
                }
            )
    }
}

const addRollList = async (req, res) => {
    try{
        const dataRollList = {...req.body}
        const rollList = await db.RollList.create(dataRollList);

        res.status(200).json(
            {  
                rollList,
                message: "Se agrego un nuevo lista de usuario"
            }
        )
    } catch(error){
        return res.status(400).json(
            {
                error:true,
                message: `Ocurrio un error con la petición ${error.message}`
            }
        )
    }
}
