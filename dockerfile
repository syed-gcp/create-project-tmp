FROM google/cloud-sdk:latest

COPY create-project.sh /create-project.sh
RUN chmod +x /create-project.sh

ENTRYPOINT ["/create-project.sh"]
