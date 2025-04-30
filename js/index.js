// Importar los módulos necesarios de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwDW9YBLACOPbiE-xOF-cN5SJcez0M0Uc",
  authDomain: "app-conection.firebaseapp.com",
  databaseURL: "https://app-conection-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-conection",
  storageBucket: "app-conection.firebasestorage.app",
  messagingSenderId: "107078957148",
  appId: "1:107078957148:web:bffae7c730e5586e5a4e99"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log('Firebase inicializado correctamente:', app);

// Asociar eventos a los formularios
$('#login-form').on('submit', login);
$('#register-form').on('submit', register);
$('#reset-form').on('submit', resetPassword);

/**
 * Función para iniciar sesión con correo y contraseña
 */
function login(e) {
  e.preventDefault(); // Prevenir envío del formulario
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Login exitoso
      showAlert('Sesión iniciada correctamente.', 'success');
      console.log('Usuario logueado:', userCredential.user);
    })
    .catch(error => {
      // Mostrar error
      showAlert(error.message, 'danger');
    });
}

/**
 * Función para registrar un nuevo usuario
 */
function register(e) {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      //si el usario se crea guardamos los datos del usuario
      setPerfil();
      // Registro exitoso
      showAlert('Cuenta creada exitosamente.', 'success');
      console.log('Nuevo usuario registrado:', userCredential.user);
      showLogin(); // Volver al login después de registrarse
    })
    .catch(error => {
      showAlert(error.message, 'danger');
    });
}

/**
 * Función para enviar correo de recuperación de contraseña
 */
function resetPassword(e) {
  e.preventDefault();
  const email = document.getElementById('reset-email').value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      showAlert('Correo de recuperación enviado.', 'info');
      showLogin();
    })
    .catch(error => {
      showAlert(error.message, 'danger');
    });
}

function setPerfil() {
  var nombre, email, edad, imagen, ciudad;
  // Aquí puedes implementar la lógica para establecer el perfil del usuario
  // Por ejemplo, guardar datos en Firestore o en Realtime Database
       nombre = $("#nombre").val();
        email = $("#email").val();
        ciudad = $("#ciudad").val();

        if (!imagen) {
            imagen = "NONE";
        }

        var datosUsuario = {
            nombre: nombre,
            edad: edad,
            email: email,
            ciudad: ciudad,
            url_imagen: imagen,
        };

  console.log('Establecer perfil del usuario...');
  return;
}

/**
 * Función para subir una imagen a Firebase Storage, obtener su URL y guardarla en Firestore
 * @param {File} file - Archivo de imagen a subir
 */
async function uploadImageAndSaveURL(file) {
  try {
    // Crear una referencia en Firebase Storage
    const storageRef = ref(storage, `images/${file.name}`);

    // Subir el archivo a Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Imagen subida exitosamente:', snapshot);

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(storageRef);
    console.log('URL de descarga:', downloadURL);

    // Guardar la URL en Firestore (ejemplo)
    const docRef = await db.collection('images').add({
      url: downloadURL,
      name: file.name,
      createdAt: new Date()
    });
    console.log('URL guardada en Firestore con ID:', docRef.id);

    return downloadURL;
  } catch (error) {
    console.error('Error al subir la imagen o guardar la URL:', error);
    throw error;
  }
}

// Ejemplo de uso: manejar el evento de cambio en un input de tipo file
document.getElementById('file-input').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const url = await uploadImageAndSaveURL(file);
      console.log('Imagen procesada correctamente. URL:', url);
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
    }
  }
});


/**
 * Mostrar un mensaje de alerta
 * @param {string} message - Texto del mensaje
 * @param {string} type - Tipo de alerta ('success', 'danger', 'info', etc.)
 */
function showAlert(message, type) {
  const alertContainer = document.getElementById('alert-container');
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}
