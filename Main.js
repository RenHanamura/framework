/* - - - - - - - - - - - - - - - - - - - - - - APARTADO B-Registro - - - - - - - - - - - - - - - - - - - - - - */

// Determino el evento con el cual mando a llamar a una función mediante el click de un botón
//document.querySelector('#btn-crear').addEventListener('click', crearCuenta);

$('#btn-crear').on('click', function(){
    crearCuenta();
})

//Función que crea y almacena el arreglo de objetos / Usuarios
function crearCuenta(){

    //Variables que guardan los datos personales del ususario
    let correo       =  document.getElementById('correo').value;
    let usuario      =  document.getElementById('usuario').value;
    let nombreUser   =  document.getElementById('nombre').value;
    let A_paterno    =  document.getElementById('apellido-p').value;
    let A_materno    =  document.getElementById('apellido-m').value;
    let contraseña   =  document.getElementById('contra-1').value;
    let contraPrueba =  document.getElementById('contra-2').value;
    let genero       =  $("input:radio[name=genero]:checked").val();

    let TransformData = [correo,usuario,nombreUser,A_paterno,A_materno,contraseña,contraPrueba];

    let permiso      = true; 

    let isExist      = false;

    if(localStorage.getItem('User')){
        let ArrayObjectUser = JSON.parse(localStorage.getItem('User'));
    let posicionObject;

    for(let i = 0; i < ArrayObjectUser.length; i++){
        //Si existe el correo no te permite registrar sesión con el mismo
        if(ArrayObjectUser[i]['Correo'] == correo){
            permiso = false;
            
            posicionObject = i;
            i = ArrayObjectUser.length;
        }else{
            permiso = true;
        }
    }
}

    if(permiso == false){
        alert("¡El correo ingresado ya ha sido registrado :¨( !Intenta con otro correo!");
    }else{
        let estado = true;

        for(let i = 0; i < TransformData.length; i++){
            if(TransformData[i].length != 0){
                //Dato lleno
            }else{
                //Dato vacio
                estado = false;
            }
        }

        if(estado == false){
            alert("¡Algunos campos importantes están vacíos!");
        }

        if(contraseña.length < 8 && contraPrueba.length < 8){
            alert("¡Se requiere que la contraseña tenga minimo 8 caracteres!")
        }
        if(contraseña.length >= 8 && contraPrueba.length >= 8){
            if(contraseña != contraPrueba){
                alert("¡Las contaseñas no coinsiden!")
            }else if(estado == true && contraseña == contraPrueba){
    
                let perfil = {
                    "Correo": correo,
                    "Usuario": usuario,
                    "Nombre": nombreUser,
                    "Apellido paterno":A_paterno,
                    "Apellido materno":A_materno,
                    "Contraseña":contraseña,
                    "Genero":genero
                }
                let ArrayObjectUser = JSON.parse(localStorage.getItem('User'));
                if(localStorage.getItem('User')){
            
                    for(let i = 0; i < ArrayObjectUser.length; i++){
                        //Si existe la contraseña && Si existe el correo
                        if(ArrayObjectUser[i]['Correo'] == perfil.Correo){
                            isExist = true;
                            posicionObject = i;
                            
                            i = ArrayObjectUser.length;
                        }else{
                            isExist = false;
                        }
                    }
                }
                if(isExist == false){
                 /* -    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
                //Creando activos y pasivos
                // 0 = Ingresos / 1 = Gastos
                let activosPasivos = [1000, 0];

                //preSet = Acopla el dato para entrar como arreglo en el localStorage
                let preSet = JSON.stringify(activosPasivos);
                localStorage.setItem(correo, preSet);
                /* -    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

                //Creando usuario
                let contenedorUser = JSON.parse(localStorage.getItem('User')) || [];
                contenedorUser.push(perfil);
           
                let contenedorJSON = JSON.stringify(contenedorUser);
                localStorage.setItem("User", contenedorJSON);

                alert("¡Usuario registrado exitosamente! hola " + usuario + " ;3");
                window.location.href="A-Login.html";
            } else{
                alert("¡El correo ingresado ya ha sido registrado :¨( !Intenta con otro correo!");
            }
        }  
    }  
}
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function guardaStorage(perfil){
    let contenedorUser = JSON.parse(localStorage.getItem('User')) || [];
    contenedorUser.push(perfil);

    let contenedorJSON = JSON.stringify(contenedorUser);
    localStorage.setItem("User", contenedorJSON); 
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* - - - - - - - - - - - - - - - - - - - - - - - APARTADO A-Login - - - - - - - - - - - - - - - - - - - - - - - */
$('#btn-inicio').on('click', function(){
    iniciarSesion();
})

function iniciarSesion(){
    let contraseña  = $('#contraseña').val();
    let correo      = $('#Correo').val(); 

    let sesion      = true; 
    let posicionObject;

    let ArrayObjectUser = JSON.parse(localStorage.getItem('User')); 

    //Variables que invalidan campos vacíos
    let TransformData = [correo,contraseña];
    let estado = true;

    for(let i = 0; i < TransformData.length; i++){
        if(TransformData[i].length != 0){
            //Dato lleno
        }else{
            //Dato vacio
            estado = false;
        }
    }

    if(estado == false){
        alert("¡No puedes enviar campos vacíos >:( !");
    }else{

        //Si es que existe el registro en localStorage
        if(localStorage.getItem('User')){
            
            for(let i = 0; i < ArrayObjectUser.length; i++){
                //Si existe la contraseña && Si existe el correo
                if(ArrayObjectUser[i]['Contraseña'] == contraseña && ArrayObjectUser[i]['Correo'] == correo){
                    sesion = true;
                    posicionObject = i;
                    
                    i = ArrayObjectUser.length;
                }else{
                    sesion = false;
                }
            }

        }else{// No existe el registro en localStorage
            alert("¡No existe ningún registro en localStorage!");
        }
        
        if(sesion == true){
            alert("¡Iniciando sesión bienvenid@ " + ArrayObjectUser[posicionObject]['Usuario'] + "!");
            //Guardo el numero del objeto al que corresponde mi perfil
            localStorage.setItem('Usuario-Activo',JSON.stringify(posicionObject));

            window.location.href="Catalogos.html";
        }else if(sesion == false){
            alert("!Correo o contraseña incorrectos >:( ¡");
        }
    }
}

/* - - - - - - - - - - - - - - - - - - - - - - - APARTADO C-Dash - - - - - - - - - - - - - - - - - - - - - - - */
    
//Convierto en arreglo mi objeto/perfil guardado en localStorage //Este es mi posición del arreglo del usuario activo
var userActive = JSON.parse(localStorage.getItem('Usuario-Activo')); // --> Posición del arreglo

//Guardo en forma de arreglo mi registro del local que posee mis objetos
var ArrayObjectUser = JSON.parse(localStorage.getItem('User')); // --> Arreglo de objetos

document.getElementById('Usuario-Activo-html').innerHTML = (ArrayObjectUser[userActive]['Usuario']);

document.getElementById('cantidad-productos').innerHTML = (" " + 9);


var UserCaja = JSON.parse(localStorage.getItem(ArrayObjectUser[userActive]['Correo']));

//Función que jala el dinero en caja // 
document.getElementById('cantidad-caja').innerHTML = (" " + UserCaja[0] - UserCaja[1]); // --> DINERO EN CAJA


// - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

/* - - - - - - - - - - - - - - - - - - - - - - - APARTADO D-Ventas - - - - - - - - - - - - - - - - - - - - - - - */

function calculoVentas(){
    let wafle   =  parseInt(document.getElementById('Wafles').value);
    let HotCake =  parseInt(document.getElementById('HotKakes').value);
    let Frape   =  parseInt(document.getElementById('Frapes').value);

    if(isNaN(wafle) == true){
        wafle = 0;
    }

    if(isNaN(HotCake) == true){
        HotCake = 0;
    }

    if(isNaN(Frape) == true){
        Frape = 0;
    }

    let subtotal = (wafle + HotCake + Frape);

    if(wafle == 0 && HotCake == 0 && Frape == 0){
        alert("No hay ninguna venta registrada");
    }else{
        alert("Venta realizada por " + subtotal + " pesos ;)");
    }

/* - - - - - - - - - - - - - - - - - - - - - - - RECOLECCIÓN DATOS LOCALES - - - - - - - - - - - - - - - - - - - - - - - */

    //Convierto en arreglo mi objeto/perfil guardado en localStorage //Este es mi posición del arreglo del usuario activo
    var userActive = JSON.parse(localStorage.getItem('Usuario-Activo')); // --> Posición del arreglo
    
    //Guardo en forma de arreglo mi registro del local que posee mis objetos
    let ArrayObjectUser = JSON.parse(localStorage.getItem('User')); // --> Arreglo de objetos

    //¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ESTE ES EL CORREO CONCRETO DEL USUARIO ACTIVO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let ArrayObjectUser_correo = ArrayObjectUser[userActive]['Correo'];

    //UserActive_Caja --> El dinero
    let UserCaja = JSON.parse(localStorage.getItem(ArrayObjectUser_correo));

    let ventasLocal = UserCaja[0];
    let gastosLocal = UserCaja[1];

    //alert(ArrayObjectUser_correo);

    /* alert(ventasLocal);  
    alert(gastosLocal); */

    let total = ventasLocal += subtotal;
    let totalArray = [total,gastosLocal]

    //LocalStorage Actualizado
    localStorage.setItem(ArrayObjectUser_correo, JSON.stringify(totalArray));
    
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    //Impresión de resultados
    document.getElementById('totales-venta').innerHTML = (" " + subtotal);
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function calculoGasto(){
    let operativo     =  parseInt(document.getElementById('gasto-1').value);
    let servicio      =  parseInt(document.getElementById('gasto-2').value);
    let proveedores   =  parseInt(document.getElementById('gasto-3').value);

    if(isNaN(operativo) == true){
        operativo = 0;
    }

    if(isNaN(servicio) == true){
        servicio = 0;
    }

    if(isNaN(proveedores) == true){
        proveedores = 0;
    }

    let subtotal = (operativo + servicio + proveedores);

    if(operativo == 0 && servicio == 0 && proveedores == 0){
        alert("No hay ningún pago registrado");
    }else{
        alert("Pago realizado por " + subtotal + " pesos ;)");
    }

/* - - - - - - - - - - - - - - - - - - - - - - - RECOLECCIÓN DATOS LOCALES - - - - - - - - - - - - - - - - - - - - - - - */

    //Convierto en arreglo mi objeto/perfil guardado en localStorage //Este es mi posición del arreglo del usuario activo
    var userActive = JSON.parse(localStorage.getItem('Usuario-Activo')); // --> Posición del arreglo
    
    //Guardo en forma de arreglo mi registro del local que posee mis objetos
    let ArrayObjectUser = JSON.parse(localStorage.getItem('User')); // --> Arreglo de objetos

    //¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ESTE ES EL CORREO CONCRETO DEL USUARIO ACTIVO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let ArrayObjectUser_correo = ArrayObjectUser[userActive]['Correo'];

    //UserActive_Caja --> El dinero
    let UserCaja = JSON.parse(localStorage.getItem(ArrayObjectUser_correo));

    let ventasLocal = UserCaja[0];
    let gastosLocal = UserCaja[1];

    //alert(ArrayObjectUser_correo);

    /* alert(ventasLocal);  
    alert(gastosLocal); */

    let total = gastosLocal += subtotal;
    let totalArray = [ventasLocal,total]

    //LocalStorage Actualizado
    localStorage.setItem(ArrayObjectUser_correo, JSON.stringify(totalArray));
    
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    //Impresión de resultados
    document.getElementById('totales-venta').innerHTML = (" " + subtotal);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function restablecer(){
    let estado = confirm("Si es la primera ves que inicias sesión, resetear la página borrara tu bonificación de $1,000 pesos ¿Estas seguro?");

    if(estado == false){
        window.location.href="C-Dash.html";
    }else{
        //Convierto en arreglo mi objeto/perfil guardado en localStorage //Este es mi posición del arreglo del usuario activo
        var userActive = JSON.parse(localStorage.getItem('Usuario-Activo')); // --> Posición del arreglo
        
        //Guardo en forma de arreglo mi registro del local que posee mis objetos
        let ArrayObjectUser = JSON.parse(localStorage.getItem('User')); // --> Arreglo de objetos
    
        //¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ESTE ES EL CORREO CONCRETO DEL USUARIO ACTIVO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let ArrayObjectUser_correo = ArrayObjectUser[userActive]['Correo'];
    
        let reinicio = [0,0];
    
        localStorage.setItem(ArrayObjectUser_correo, JSON.stringify(reinicio));
    
        alert("Valores reiniciados ;)");
        }
    
}

// - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

/* $('#btn-inicio').on('click', function(){
    var email = $('#Correo').val();
    var clave = $('#contraseña').val(); // -> Dato que ingresa el usuario
    const usuario = JSON.parse(localStorage.getItem(clave)); 

    if(usuario && usuario.Correo == email){
        alert("Iniciando sesión " + " ;3 " + usuario.Usuario);
        window.location.href="C-Dash.html";

    }else if(usuario == null || usuario.Correo != email){
        alert("¡Usuario o contraseña incorrectos!");
    }

    document.getElementById('contraseña');
document.getElementById('Correo');

}) */

/* document.getElementById('cantidad-caja').innerHTML = (" $ " + 10000);
document.getElementById('cantidad-productos').innerHTML = (" " + 6); */

/* --------------------------------------- GRAFICAS --------------------------------------- */


/* $('#btn-crear').on('click', function(){
    var estado = true;
    if(estado == true){
        window.location.href="A-Login.html";
    }
});
 */
    /* function obtenerInfo(){
        // Verificar dato
        var nuevaCuenta = JSON.parse(localStorage.getItem("Perfil")); 

        console.log(nuevaCuenta);
    } */

    

