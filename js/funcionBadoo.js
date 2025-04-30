import * as geolib from 'geolib';
        //...
        const sitioActual = {latitude:req.query.lat, longitude:req.query.lon};
        console.log("sitioActual",sitioActual);

        const coords:geolib.PositionAsDecimal = sitioActual;

        console.log("coords",coords);

        db.collection('sitios').get()
        .then((snapshot) => {

            const sitiosActuales:geolib.PositionAsDecimal[] = [];

            snapshot.forEach((doc) => {
                sitiosActuales.push( doc.data().coords );
            });

            console.log("sitiosActuales",sitiosActuales);

            const lugaresMasCercanos:geolib.Distance = geolib.findNearest(coords, sitiosActuales, 1);
            console.log("lugaresMasCercanos",lugaresMasCercanos);

            if(lugaresMasCercanos){

                console.log("Aquí verás los lugares Mas Cercanos",lugaresMasCercanos);

            }else{
                console.log('No existen lugares cercanos');
             }

        })
        .catch((err) => {
            console.log('Error en consulta: ', err);
            //Maneja tu error de la consulta aquí
        });