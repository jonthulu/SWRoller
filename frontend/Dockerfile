FROM nginx

COPY build /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD config/nginx.conf /etc/nginx/

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose prots
EXPOSE 80

# Set the default command to execute
CMD ["service", "nginx", "start"]
