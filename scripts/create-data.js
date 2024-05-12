const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
});

// Función para generar datos de usuario de prueba
async function generateUserData() {
  const firstName = getRandomFirstName();
  const lastName = getRandomLastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const pass = 'password123'; // Puedes generar contraseñas aleatorias aquí si lo deseas
  const phone = '123-456-7890'; // Datos estáticos para este ejemplo
  const dni = '12345678A'; // Datos estáticos para este ejemplo
  return { firstName, lastName, email, pass, phone, dni };
}

// Función para generar datos de servicio de prueba
async function generateServiceData(userId) {
  const name = 'Servicio de ejemplo';
  const description = 'Descripción del servicio de ejemplo';
  const paymentChoice = 1; // Datos estáticos para este ejemplo
  const creationDate = new Date(); // Fecha actual
  const completedJobs = 0; // Datos estáticos para este ejemplo
  const price = 50; // Datos estáticos para este ejemplo
  return {
    name,
    description,
    paymentChoice,
    creationDate,
    completedJobs,
    price,
    userId,
  };
}

// Función para generar datos de tipo de servicio de prueba
async function generateServiceTypeData() {
  const type = 'Tipo de servicio de ejemplo';
  const picture = 'ruta/de/imagen.png'; // Ruta de la imagen estática para este ejemplo
  return { type, picture };
}

// Función para generar datos de jornada de prueba
async function generateJourneyData(serviceId) {
  const week = 'Semana de ejemplo';
  const day = 'Día de ejemplo';
  const hour = '10:00'; // Hora estática para este ejemplo
  const available = true; // Datos estáticos para este ejemplo
  return { week, day, hour, available, serviceId };
}

// Función principal para generar datos de prueba
async function generateTestData() {
  try {
    // Generar datos de prueba para cada tabla
    for (let i = 0; i < 5; i++) {
      const userData = await generateUserData();
      const { id: userId } = await createUser(userData);
      const { id: serviceId } = await createService(
        await generateServiceData(userId),
      );
      await createServiceType(await generateServiceTypeData());
      await createJourney(await generateJourneyData(serviceId));
    }
    console.log('Datos de prueba generados exitosamente.');
  } catch (error) {
    console.error('Error al generar datos de prueba:', error);
  } finally {
    await pool.end(); // Cerrar la conexión cuando hayamos terminado
  }
}

// Llamar a la función principal para generar los datos de prueba
generateTestData();

// Funciones simuladas para crear registros en la base de datos
async function createUser(userData) {
  // Insertar datos de usuario en la base de datos y devolver el ID generado
  // Aquí deberías implementar la lógica para insertar en tu base de datos real
  return { id: 1 }; // Simulamos que el ID generado es 1
}

async function createService(serviceData) {
  // Insertar datos de servicio en la base de datos y devolver el ID generado
  // Aquí deberías implementar la lógica para insertar en tu base de datos real
  return { id: 1 }; // Simulamos que el ID generado es 1
}

async function createServiceType(serviceTypeData) {
  // Insertar datos de tipo de servicio en la base de datos y devolver el ID generado
  // Aquí deberías implementar la lógica para insertar en tu base de datos real
  return { id: 1 }; // Simulamos que el ID generado es 1
}

async function createJourney(journeyData) {
  // Insertar datos de jornada en la base de datos
  // Aquí deberías implementar la lógica para insertar en tu base de datos real
}
