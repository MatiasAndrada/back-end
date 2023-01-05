/*
!PROXY & NGINX
?PROXY
*Es un servidor que hace deontermediario entre las conexiones de un cliente y un servidor de destio, filtrando todos los paquetes entre ambos.
*Sin el PROXY la conexion entre cliente y servidor de origen a traves de la web es directa.
*Se usa para navegar por internet de forma mas anoniima ya que se oculta la IP, sea del cliente o server de origen.
*Por ser intermediario, ofrece funcionalidades como control de acceso, registro de trafico, mejora de rendimiento, entre otras.

*Proxy directo (forward)
Es un servidor proxy que se coloca entre el cliente y la web.
Recibe la petición del cliente para acceder a un sitio web, y la transmite al servidor del sitio, para que este no se entere de qué cliente está haciendo la petición.
Lo utiliza un cliente cuando quiere anonimizar su IP. 
Es útil para mejorar la privacidad, y para evitar restricciones de contenido geográfico (contenido bloqueado en cierta región).
*Proxy inverso (reverse)
Es este caso, el servidor proxy se coloca entre la web y el servidor de origen.
Entonces, el que se mantiene en el anonimato es el servidor de origen. Garantiza que ningún cliente se conecte directo con él y por ende mejore su seguridad.
En general el cifrado SSL de un sitio web seguro se crea en el proxy (y no directamente en el servidor).
Además, es útil para distribuir la carga entre varios servidores web.


*Ambos pueden trabajar juntos, ya que no se superponen en su funcionamiento.
*Los clientes/usuarios pueden utilizar un proxy directo y los servidores de origen un proxy inverso.

?Utilizar PROXY INVERSO en backend
*Balancear la carga: 
Un solo servidor de origen, en una página con millones de visitantes diarios, no puede manejar todo el tráfico entrante. El proxy inverso puede recibir el tráfico entrante antes de que llegue al servidor de origen. Si este está sobrecargado o cae completamente, puede distribuir el tráfico a otros servidores sin afectar la funcionalidad del sitio. Es el principal uso de los servidores proxy inverso.
*Seguridad:
El proxy inverso puede filtrar el tráfico entrante y rechazar cualquier solicitud que no cumpla con los requisitos de seguridad. Por ejemplo, puede rechazar solicitudes de clientes que no estén en una lista blanca de direcciones IP.
*Cache:
El proxy inverso puede almacenar una copia de los archivos solicitados por los clientes. Si un cliente solicita un archivo que ya se ha almacenado en el caché, el proxy inverso puede servirlo directamente sin tener que consultar al servidor de origen. Esto puede reducir la carga en el servidor de origen y mejorar el rendimiento del sitio.
*Compresión superior: 
Un proxy inverso es ideal para comprimir las respuestas del servidor. Esto se utiliza mucho ya que las respuestas del servidor ocupan mucho ancho de banda, por lo que es una buena práctica comprimirlas antes de enviarlas al cliente.
*Cifrado SSL optimizado: 
Cifrar y descifrar las solicitudes SSL/TLS para cada cliente puede ser muy difícil para el servidor de origen. Un proxy inverso puede hacer esta tarea para liberar los recursos del servidor de origen para otras tareas importantes, como servir contenido.
*Monitoreo y registro del tráfico: 
Un proxy inverso captura cualquier petición que pase por él. Por lo tanto, podemos usarlos como un centro de control para monitorear y registrar el tráfico. Incluso si utilizamos varios servidores web para alojar todos los componentes de nuestro sitio web, el uso de un proxy inverso facilitará la supervisión de todos los datos entrantes y salientes del sitio.

!NGINX
*Es un servidor web/proxy inverso ligero de alto rendimiento y un proxy para protocolos de correo electrónico (IMAP/POP3).

?Configuracion:
Luego, para listar los procesos de Nginx, podemos usar el comando tasklist.
Uno de los procesos es el master y el otro es worker.
Si Nginx no inicia, buscar la razón del error en la carpeta logs/error.log.
Si no existe el archivo, entonces la razón la encontramos en el Windows Event Log.

?Comandos:
Nginx en Windows se ejecuta como una aplicación y tambien tiene comandos.   
 ./nginx.exe -s stop  para un apagado rápido.
 ./nginx.exe -s quit  para un cierre más elegante.
 ./nginx.exe -s reload  para reiniciar el servidor al cambiar la configuración, iniciar nuevos procesos de trabajo con una nueva configuración, cierre elegante de los procesos de trabajo antiguos.
 ./nginx.exe -s reopen  para reabrir logs de archivos.


!NGINX PROXY INVERSO
Para eso, primero, cambiamos el archivo nginx.conf de la carpeta conf del Nginx por el siguiente código.

?nginx.conf

events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    
    upstream node_app {
        server 127.0.0.1:8081
        server 127.0.0.1:8081 weigth=3

    }

    server {
        listen       80;
        server_name  mginx_node;
        root ../NginxNode/public


        location /datos {
            proxy_pass http://node_app;

        }
    }
}

*Podemos ver que están definidos los dos servidores de Node. 
*El segundo se está usando como balanceador de carga (por eso se pone  weight=3 ). Si no estuviera el peso, la carga se distribuye mitad para cada uno.
*Luego, configuramos el puerto, el nombre del servidor de Nginx y la ruta hacia el espacio público del proyecto en Node. En este caso, un directorio más arriba, dentro del proyecto de servidor node.















*/
