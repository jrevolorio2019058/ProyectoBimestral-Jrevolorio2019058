const mongoose = require('mongoose');

const dbConnection = async () => {
    
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Conexión Exitosa Base de Datos');
    } catch (e) {
        throw new Error('Error Conexión Base de Datos', e);
    }

}

module.exports = {
    dbConnection
}