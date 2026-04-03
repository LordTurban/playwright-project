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
                    // Get the path to the docker tool we configured
                    def dockerHome = tool name: 'docker', type: 'docker-tool'
                    
                    // Add the tool's bin folder to the PATH for the following commands
                    withEnv(["PATH+DOCKER=${dockerHome}/bin"]) {
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