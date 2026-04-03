FROM jenkins/jenkins:lts

USER root

# Install the Docker CLI
RUN apt-get update && apt-get install -y docker.io

# Switch back to the jenkins user for security, 
# but keep it in the docker group to access the socket
USER jenkins