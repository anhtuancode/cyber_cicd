/**
 * TERMINAL 
 *  xem logs container
 *  docker logs id_name_container 
 *  
 *  xem dia chi container
 *  docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_DB_SQL_container
 * 
 * IMAGE 
 * 
 * build: 
 *  docker build -t <ten_image> .
 *   dấu chấm chỉ đường dẫn của docker file
 * 
 * delete:
 *  docker image remove img-cyber-nodejs50
 * 
 *  đưa image mới tạo lên docker hub
 *      docker push ten_id_image
 * 
 * 
 * 
 * container 
 *  run:
 *      docker container run --name <ten_container> -p 3070:3069 -d ten_id_image
 *  list:
 *      docker container list   
 *          lấy ra tất cả container online viết tắt là list
 * 
 *  Xóa container
 *      docker container rm <ten_id_container>
 *  
 *          
 * 
 *      docker container ls -a: lấy ra tất cả container online và offline
 *      docker container ls : lấy ra tất cả container online
 * 
 *  Docker compose
 *  docker compose up -d
 * 
 *  docker compose down
 * 
 *  
 */