
        // Inicializar Supabase
        import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

        const supabaseUrl = "https://srcawgqnbyyzhbqpznpd.supabase.co"; // Reemplaza con tu URL de Supabase
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyY2F3Z3FuYnl5emhicXB6bnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NDEzODMsImV4cCI6MjA1OTExNzM4M30.DI8Ab7zicxcIo56rdrO6UE0T_zZ7TmHNFZe4a4Z7w-0"; 
        const BUCKET_NAME = "imagenes"; // Nombre del bucket en Supabase
        const supabase = createClient(supabaseUrl, supabaseKey);

        //autiticar usuarios
        async function autenticarUsuario() {
            //obtenemos los datos del formulario
            const email = document.getElementById("email").value;   
            const password = document.getElementById("password").value;
           
           // Autenticar al usuario (si no está autenticado)
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: "usuarios@admin.com",
                password: "12345678",
            });

            if (authError) {
                console.error("Error al autenticar al usuario:", authError);
                alert("Error al autenticar al usuario.");
                return;
            }
            if(authData){
                guardarUsuario();
            }

            //console.log("Usuario autenticado:", authData.user);
        }