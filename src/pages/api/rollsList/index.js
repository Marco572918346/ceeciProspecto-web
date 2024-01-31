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
                        attributes: ['name', 'lastname', 'secondLastname', 'area'],
                    include: [{
                        model: db.Course,
                        as: 'course',
                        attributes: ['id', 'name', 'area'],
                    }],
                }],
            });
            const newData = data.map(roll => {
                const user = roll.rools; //acceder a la instancia de User relacionada
                const status = user ? user.userStatus: null ;

                    if (!user){
                        return {
                            ...roll.toJSON(),
                            fullName: 'N/A',
                            course: 'N/A',
                        };
                    }
                //concatenar los atributos
                const fullName = `${user.name} ${user.lastname} ${user.secondLastname}`;
                const courseFull = `${course.name} ${course.area}`
                //retornar fullName
                return{
                    ...roll.toJSON(),
                    fullName,
                    courseFull,
                };
            })
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
    try {
        let dataList;

        if (Array.isArray(req.body)) {
            // Si req.body es un array, lo utilizamos directamente
            dataList = req.body;
        } else {
            // Si no es un array, lo convertimos en un array con un solo elemento
            dataList = [req.body];
        }

        console.log("Data Roll List:", dataList);

        const updatedRollLists = [];
        const newRollLists = [];

        // Separar la lógica para actualizar y agregar nuevos registros
        await Promise.all(dataList.map(async (data) => {
            // Buscar un registro existente con el mismo studentId y date
            const existingRollList = await db.RollList.findOne({
                where: {
                    studentId: data.studentId,
                    date: data.date
                }
            });

            if (existingRollList) {
                // Si existe, actualizamos los datos y lo agregamos a la lista de actualizados
                await existingRollList.update(data);
                updatedRollLists.push(existingRollList);
            } else {
                // Si no existe, creamos un nuevo registro y lo agregamos a la lista de nuevos
                const newRollList = await db.RollList.create(data);
                newRollLists.push(newRollList);
            }
        }));

        let message = "No se realizaron cambios";

        // Verificar si se actualizaron o agregaron registros y ajustar el mensaje
        if (updatedRollLists.length > 0 && newRollLists.length > 0) {
            message = "Se actualizaron algunos registros y se agregaron nuevos";
        } else if (updatedRollLists.length > 0) {
            message = "Se actualizaron algunos registros";
        } else if (newRollLists.length > 0) {
            message = "Se agregaron nuevos registros";
        }

        res.status(200).json({
            updatedRollLists,
            newRollLists,
            message
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: `Ocurrió un error con la petición: ${error.message}`
        });
    }
};
