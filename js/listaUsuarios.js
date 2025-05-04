// Importar los módulos necesarios de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
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

// Inicializar la base de datos de Firebase vero
/*
   var config = {
    appId: "1:314231053868:android:b2c367fd1569a84266fb89",
    apiKey: "AIzaSyDPhU_Oz4AgZDgLxBK9-cY0yULn6s9YG2k",
    authDomain: "connection-bc106.web.app",
    databaseURL: "https://connection-bc106-default-rtdb.firebaseio.com/",
    projectId: "connection-bc106",
    storageBucket: "connection-bc106.firebasestorage.app",
    messagingSenderId: "314231053868"
};
*/
    
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getFirestore(app);
    const storage = getStorage(app);

    
    // verificar el estado de autenticación del usuario.
    //  Si el usuario está autenticado, se redirige automáticamente a listaUsuarios.html
    auth.onAuthStateChanged((user) => {
        if (user) {
        console.log('Usuario autenticado:', user.email);
        
        } else {
        console.log('No hay usuario autenticado.');
        }
    });

    //devuelve el usuario autenticado utilizando auth.currentUser. Si no hay un usuario autenticado, devuelve null.
    export function getAuthenticatedUser() {
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (user) {
            console.log("Usuario autenticado:", user.email);
            return user;
        } else {
            console.error("No hay usuario autenticado.");
            return null;
        }
    }
    
    console.log('Firebase inicializado correctamente:', app);
   
    // Obtener la referencia a la colección de usuarios
    const usuariosRef = collection(database, "usuarios");
    let prevUsuario = "";
    $('#listado').empty();

    // Limpiar el contenedor antes de agregar nuevos elementos
    const listadoContainer = document.getElementById('listado');
    if (listadoContainer) {
      listadoContainer.innerHTML = '';
    }

     // Obtener los datos de los usuarios para firestore version actual en lugar de database.ref
    getDocs(usuariosRef)
      .then((snapshot) => {
        const usuarios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Limpiar el contenedor antes de agregar nuevos elementos
        $('#listado').empty();

        // Usar un bucle `for` basado en la longitud de la colección
        for (let i = 0; i < usuarios.length; i++) {
          const usuario = usuarios[i];
          let prevUsuario = '<div class="user-card" style="display:flex; align-items:center; margin:10px;">';

          // Imagen codificada en JSON
          if (usuario.imagen && usuario.imagen.content) {
            prevUsuario += '<button class="btn-usuario" style="border:none; background:none;">';
            prevUsuario += `<img src="${usuario.imagen.content}" alt="Usuario" style="width:50px; height:50px;"/>`;
            prevUsuario += '</button>';
          } else {
            prevUsuario += '<button class="btn-usuario" style="border:none; background:none;">';
            prevUsuario += '<img src="img/anonimo.jpg" alt="Sin Fotografía" style="width:50px; height:50px;"/>';
            prevUsuario += '</button>';
          }

          // Nombre al lado de la imagen
          prevUsuario += `<div style="margin-left:10px; font-size:14px;">${usuario.nombre || 'Sin nombre'}</div>`;

          prevUsuario += '</div>';

          // Agregar al contenedor
          $('#listado').append(prevUsuario);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });

    // Función para manejar el clic en la imagen
    function accionUsuario(idUsuario) {
        // Redirige a chat.html pasando el ID del usuario
        window.location.href = "chat.html?usuario=" + encodeURIComponent(idUsuario);
    }

