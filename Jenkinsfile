pipeline {
    agent any

    environment {
        // Create a 'Secret Text' credential in Jenkins with your Webhook URL
        DISCORD_URL = credentials('discord-webhook-url')
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins automatically pulls your GitHub repo if configured in the job
                checkout scm
            }
        }

        stage('Build Playwright Image') {
            steps {
                script {
                    // 1. Locate the tool you defined in Global Tool Configuration
                    def dockerHome = tool name: 'docker', type: 'docker-tool'
                    
                    // 2. Wrap the docker command in an environment that knows where the 'docker' binary is
                    // and knows how to talk to your 'docker' container (DinD)
                    withEnv([
                        "PATH+DOCKER=${dockerHome}/bin",
                        "DOCKER_HOST=tcp://docker:2376",
                        "DOCKER_TLS_VERIFY=1",
                        "DOCKER_CERT_PATH=/certs/client"
                    ]) {
                        sh 'docker build -t playwright-runner .'
                    }
                }
            }
        }

        stage('Run Tests & Notify') {
            steps {
                script {
                    try {
                        // Pass the webhook URL into the container
                        sh "docker run --rm -e DISCORD_WEBHOOK_URL=${DISCORD_URL} playwright-runner"
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Tests failed, notification should have been sent via Playwright global teardown."
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Keep the Jenkins container clean
        }
    }
}