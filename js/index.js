// Importar los módulos necesarios de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
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
      
      console.log('Usuario logueado:', userCredential.user);
      setTimeout(() => {
        window.location.href = './listaUsuarios.html';
      }, 3000);
      // Redirigir a listaUsuarios.html después para listar usuarios
      //window.location.href = 'listaUsuarios.html'; // Redirigir a la página de lista de usuarios
    })
    .catch(error => {
      // Mostrar error
      showTemporaryAlert('Email o contraseña incorrectos.', 'danger'); // Mostrar alerta de error
      //showAlert(error.message, 'danger');
    });
}

/**
 * Función para registrar un nuevo usuario
 */
function register(e) {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  // Intentar crear el usuario
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Si el usuario se crea correctamente, guardar datos del perfil
      setPerfil();
      console.log('Nuevo usuario registrado:', userCredential.user);
      //showLogin(); // Volver al login después de registrarse
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        // Mostrar alerta si el correo ya está en uso
        showAlert('El correo electrónico ya está registrado. Por favor, usa otro.', 'danger', 'alert-registro');
      } else {
        console.error('Error al registrar el usuario:', error);
        // Manejar otros errores
        showAlert(error.message, 'danger', 'alert-registro');
      }
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
      showAlert('Correo de recuperación enviado.', 'info', 'alert-login');
      showLogin();
    })
    .catch(error => {
      showAlert(error.message, 'danger', 'alert-login');
    });
}

function setPerfil() {
  var nombre, email, edad, ciudad, file, imagen, facebook, instagram, img_json;

  nombre = $("#nombre").val();
  email = $("#register-email").val();
  ciudad = $("#ciudad").val() || "Sin especificar"; // Valor predeterminado si está vacío
  edad = $("#edad").val();
  facebook = $("#facebook").val() || "Sin especificar";;
  instagram = $("#instagram").val() || "Sin especificar";;
  file = getFileFromInput("imagen");

  console.log("file", file);
  if (!file) {
    console.error("No se seleccionó ningún archivo.");
    return;
  }

  saveImageAsJSON(file).then((img_json) => {
    
    var datosUsuario = {
      nombre: nombre,
      edad: edad,
      email: email,
      ciudad: ciudad,
      facebook: facebook,
      instagram: instagram,
      imagen: img_json,
    };
    
    // Guardar datos en Firestore
    const userId = auth.currentUser.uid; // Obtener el ID del usuario autenticado
    const userRef = doc(db, 'usuarios', userId); // Crear una referencia al documento del usuario

    setDoc(userRef, datosUsuario)
      .then(() => {
        console.log("Datos del usuario guardados en Firestore:", datosUsuario);
        showTemporaryAlert('Cueta creada.', 'success'); // Mostrar alerta de éxito
        
      })
      .catch((error) => {
        console.error("Error al guardar los datos en Firestore:", error);
        showTemporaryAlert('Error al guardar los datos.', 'danger'); // Mostrar alerta de error
      });
  }).catch((error) => {
    console.error("Error al procesar la imagen:", error);
    showTemporaryAlert('Error al procesar la imagen.', 'danger'); // Mostrar alerta de error
  });

  console.log('Establecer perfil del usuario...');
}


/**
 * Función para convertir una imagen a un objeto JSON
 * @param {File} file - Archivo de imagen a convertir
 * @returns {Promise<Object>} - Objeto JSON con los datos de la imagen
 */
async function saveImageAsJSON(file) {
  try {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const imageData = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: reader.result
        };
        resolve(imageData);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error al convertir la imagen a JSON:', error);
    throw error;
  }
}

function closeAlertIfOpen(id) {
  const alertContainer = document.getElementById(id);
  if (alertContainer && alertContainer.children.length > 0) {
    alertContainer.innerHTML = ''; // Elimina todas las alertas activas
  }
}

/**
 * Mostrar un mensaje de alerta
 * @param {string} message - Texto del mensaje
 * @param {string} type - Tipo de alerta ('success', 'danger', 'info', etc.)
 */
function showAlert(message, type, id) {
  
  const alertContainer = document.getElementById(id);
  if (!alertContainer) {
    console.error('El contenedor de alertas no existe en el DOM.');
    return;
  }

  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}

/**
 * Función para obtener un archivo de un elemento de entrada de archivo dado su ID
 * @param {string} inputId - ID del elemento de entrada de archivo
 * @returns {File|null} - Archivo seleccionado o null si no se seleccionó ningún archivo
 */
function getFileFromInput(inputId) {
  const fileInput = document.getElementById(inputId);
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    console.error('No se seleccionó ningún archivo.');
    return null;
  }
  return fileInput.files[0];
}

document.getElementById('labelarchivo').addEventListener('click', function() {
  const fileInput = document.getElementById('imagen');
  if (fileInput) {
    fileInput.click();
  } else {
    console.error('El input file con ID "imagen" no existe.');
  }
});

//muestra una alerta temporal de 4 segundos con autocierre
function showTemporaryAlert(message, type) {
  closeAlertIfOpen("alert-registro"); // Cierra cualquier alerta abierta
  const alertContainer = document.getElementById('alert-registro');
  if (!alertContainer) {
    console.error('El contenedor de alertas no existe en el DOM.');
    return;
  }
  console.log('El contenedor de alertas', alertContainer);
  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type} alert-dismissible fade show mt-3`;
  alertElement.role = 'alert';
  alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  `;

  alertContainer.appendChild(alertElement);
  const botonRegistro = $('#boton-registro');
  // Eliminar la alerta automáticamente después de 3 segundos
  setTimeout(() => {
    botonRegistro.removeClass('disabled');
    alertElement.classList.remove('show');
    alertElement.addEventListener('transitionend', () => alertElement.remove());
    showLogin(); // Volver al login después de registrarse
  }, 4000);
}

/*
// verificar el estado de autenticación del usuario.
//  Si el usuario está autenticado, se redirige automáticamente a listaUsuarios.html
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('Usuario autenticado:', user.email);
    // Redirigir a listaUsuarios.html si el usuario está autenticado
    window.location.href = 'listaUsuarios.html';
  } else {
    console.log('No hay usuario autenticado.');
  }
});
*/