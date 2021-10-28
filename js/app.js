const btnEnviar = document.querySelector('#enviar'),
     btnReset = document.querySelector('#resetBtn'),
    email = document.querySelector('#email'),
    asunto = document.querySelector('#asunto'),
    mensaje = document.querySelector('#mensaje'),
    formulario = document.querySelector('form');

    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Form
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);


    //enviar email 
    formulario.addEventListener('submit',enviarEmail);

    btnReset.addEventListener('click',resetarFormulario);
}

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}


function validarFormulario(e){
 //eliminar errores
 const error = document.querySelector('p.error');
 if(error){
    error.remove();
 }

    
    if (e.target.value.length > 0){
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
       
    } else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        mostrarError();
    }


    if (e.target.type == 'email'){
        
   
        if (er.test (e.target.value)){
            console.log('Email válido');
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        } else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('Email no válido');
        }

        


    }
    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
           btnEnviar.disabled = false;
           btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
        } 
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500','background-red-100','text-red','mt-5','error','p-5');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
    
  
}


function enviarEmail (e)
{
    e.preventDefault();

    //Mostrar el spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Después de 3s ocultar el spinner
    setTimeout(function () {
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent ='Se envió correctamente';
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','uppercase');
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();
            resetarFormulario();
        },5000)

    },3000);
}


function resetarFormulario(){
    formulario.reset();
    iniciarApp();
}