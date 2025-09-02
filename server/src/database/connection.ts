import { Dialect, Sequelize } from 'sequelize';
/*
import { Dialect, Sequelize } from 'sequelize';: Aquí importamos dos cosas clave de la librería sequelize:
        
    Sequelize: Esta es la clase principal de Sequelize. Es la que usaremos para crear una nueva instancia de conexión a la base de datos.
        
    Dialect: Este es un tipo de TypeScript que representa los distintos tipos de bases de datos que Sequelize puede conectar (por ejemplo, 'mysql', 'postgres', 'sqlite', 'mssql'). Nos ayuda a asegurar la seguridad de tipos cuando especificamos el dialecto de la base de datos.
 */
import env from './env';
/*
import env from '../env';: Esto importa un módulo env desde un archivo relativo (probablemente ../env.ts o ../env.js). Este archivo env (de "environment", entorno) suele contener variables de configuración sensibles, como las credenciales de la base de datos, para mantenerlas separadas del código principal y que no queden expuestas directamente en el repositorio de código.
 */

const {db : {name,username,password,host, dialect, port}} = env;
/*
Asumiendo que env tiene una estructura como env.db.name, env.db.username, etc., esta sintaxis te permite acceder a name, username, password, host, dialect y port de forma directa sin tener que escribir env.db. cada vez.
 */

const sequelizeConnection: Sequelize = new Sequelize(name, username, password, {
    host,
    dialect: dialect as Dialect,
    port : +port, 
});
/*
const sequelizeConnection: Sequelize = ...: Aquí declaramos una variable llamada sequelizeConnection y le asignamos el tipo Sequelize.
    
    new Sequelize(name, username, password, { ... }): Este es el constructor de la clase Sequelize. Es el encargado de establecer la conexión.
    
    Los primeros tres argumentos son las credenciales básicas: el nombre de la base de datos, el nombre de usuario y la contraseña. El cuarto argumento es un objeto de opciones de configuración:
    
        host: Toma el valor de la variable host que desestructuramos de env.
        
        dialect: dialect as Dialect: Aquí se especifica el tipo de base de datos. El dialect viene de env, y as Dialect es un type assertion (aserción de tipo) de TypeScript. Le estamos diciendo al compilador: "Sé que la variable dialect (que es de tipo string) realmente contiene uno de los tipos de dialecto válidos que espera Sequelize, así que tráta este string como un Dialect." Esto proporciona seguridad de tipos.
        
        port : +port: Toma el valor de la variable port de env. El operador + antes de port es un atajo para convertir la cadena de texto (string) del puerto en un número (number), lo cual es necesario porque la configuración del archivo env a menudo se lee como cadenas.
*/

export default sequelizeConnection;