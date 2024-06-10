# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:latest

# 将前端项目的构建输出复制到 Nginx 的默认 HTML 目录
COPY ./build /usr/share/nginx/html

# 将自定义的 Nginx 配置文件复制到容器中
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf

# 暴露容器的 8000 端口
EXPOSE 8000

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
