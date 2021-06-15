window.onload = function(){
            
    var datoMax = 0;
    var muertesMax = 0;
    var hijos = document.getElementById("mapa-padre").children;

    for(var i = 0; i < hijos.length; i++){
        var id = hijos[i].id;
        var str = document.getElementById(id).getAttribute("name");
        var info = str.split("/");
        for(var j = 2; j < 5; j++){
            var numero = parseInt(info[j+(j-1)])
            if(numero > datoMax) datoMax = numero; 
        }
        var muertes = parseInt(info[2]);
        if(muertes > muertesMax) muertesMax = muertes;
    }

    // No seas hijueputa y crea un metodo mañana
    for(var i = 0; i < hijos.length; i++){
        var id = hijos[i].id;
        var str = document.getElementById(id).getAttribute("name");
        var info = str.split("/");
        var muertes = parseInt(info[2]);
        muertos(id,muertes);
    }

    function muertos(id,muertos){
        var color = muertos*255/muertesMax;
        document.getElementById(id).setAttribute("fill","rgb(" + color + ",60,60)")
    }

    document.getElementById("mapa-padre").addEventListener("mouseover", dentro);

    function dentro(zona){

        if(zona.target !== zona.currentTarget){

            var dep = zona.target.id;

            var rgb1 = document.getElementById(dep).getAttribute("fill");
            var rgb2 = rgb1.substring(4,16).split(")");
            var rgb3 = rgb2[0].split(",");

            var nuevoR = colorear(rgb3[0]);
            var nuevoG = colorear(rgb3[1]);
            var nuevoB = colorear(rgb3[2]);

            var nuevoRGB = nuevoR + "," + nuevoG + "," + nuevoB;

            //console.log(nuevoRGB);

            document.getElementById(dep).setAttribute("fill","rgb(" + nuevoRGB + ")");

            document.getElementById("info").style.visibility = "visible";
            document.onmousemove = function(evento){
                var ancho = document.getElementById("info").offsetWidth;
                var alto = document.getElementById("info").offsetHeight;

                var datosCaja = document.getElementById("caja-mapa").getBoundingClientRect();

                var midX = datosCaja.left + datosCaja.right/2;
                var midY = datosCaja.top + datosCaja.bottom/2;;

                //console.log(datosCaja);

                if (evento.clientX < midX && evento.clientY < midY){
                    document.getElementById("info").style.top = (evento.clientY - alto * 0.1) + "px";
                    document.getElementById("info").style.left = (evento.clientX + ancho * 0.2) + "px";
                    document.getElementById("fecha-info").className = "flecha-arbIzq";
                } else if (evento.clientX < midX && evento.clientY > midY){
                    document.getElementById("info").style.top = (evento.clientY - alto * 0.9) + "px";
                    document.getElementById("info").style.left = (evento.clientX + ancho * 0.2) + "px";
                    document.getElementById("fecha-info").className = "flecha-abjIzq";
                } else if (evento.clientX > midX && evento.clientY < midY){
                    document.getElementById("info").style.top = (evento.clientY - alto * 0.1) + "px";
                    document.getElementById("info").style.left = (evento.clientX - ancho * 1.2) + "px"; 
                    document.getElementById("fecha-info").className = "flecha-arbDer";
                } else if (evento.clientX > midX && evento.clientY > midY){
                    document.getElementById("info").style.top = (evento.clientY - alto * 0.9) + "px";
                    document.getElementById("info").style.left = (evento.clientX - ancho * 1.2) + "px"; 
                    document.getElementById("fecha-info").className = "flecha-abjDer";
                }

            }

            var str = document.getElementById(dep).getAttribute("name");
            var info = str.split("/");

            document.getElementById("encabezado-info").innerHTML = info[0];
            document.getElementById("amenazados").innerHTML = info[1];
            document.getElementById("asesinados").innerHTML = info[2];

            for(var i = 2; i < 5; i++){
                document.getElementById("num" + (i-1)).innerHTML = info[i+(i-1)];
                document.getElementById("per" + (i-1)).innerHTML = info[i*2]

                var numero = parseInt(document.getElementById("num" + (i-1)).innerHTML);
                var porcentaje = numero*100/datoMax;

                document.getElementById("barra" + (i-1)).style.width = porcentaje + "%";

                if(porcentaje < 35){
                    document.getElementById("num" + (i-1)).style.color = "#fff";
                    document.getElementById("num" + (i-1)).style.right = "-2vw";
                    document.getElementById("num" + (i-1)).style.fontWeight = "500";
                } else{
                    document.getElementById("num" + (i-1)).style.color = "#585b60";
                    document.getElementById("num" + (i-1)).style.right = "0.8vw";
                    document.getElementById("num" + (i-1)).style.fontWeight = "900";
                }
            }  
        }
    }

    function colorear(color){
        var nuevoCol = 0; 
        if(color >= 15) nuevoCol = color - 15;
        else nuevoCol = 0;
        return nuevoCol;
    }

    document.getElementById("mapa-padre").addEventListener("mouseout",fuera);

    function fuera(zona){
        if(zona.target != zona.currentTarget){
            var id = zona.target.id;
            var str = document.getElementById(id).getAttribute("name");
            var info = str.split("/");
            var muertes = info[2];
            muertos(id,muertes);
        }
        document.getElementById("info").style.visibility = "hidden";
        document.onmousemove = function(){
            document.getElementById("info").style.top = "0";
            document.getElementById("info").style.left = "0";   
        }
    }

}