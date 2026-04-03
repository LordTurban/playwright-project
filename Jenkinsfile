pipeline {
    agent any

    environment {
        DISCORD_URL = credentials('discord-webhook-url')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Run Playwright') {
            steps {
                script {
                    // We don't need 'tool' or 'withEnv' for network/certs 
                    // because your docker-compose mounts the local socket!
                    
                    echo "Building the Playwright Image..."
                    sh 'docker build -t playwright-runner .'

                    echo "Running Tests..."
                    try {
                        sh "docker run --rm -e DISCORD_WEBHOOK_URL=${DISCORD_URL} playwright-runner"
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Tests failed: ${e.message}"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs() 
        }
    }
}