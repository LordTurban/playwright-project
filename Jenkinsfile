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
                    echo "Building the Playwright Image using absolute path..."
                    // Use /usr/bin/docker instead of just 'docker'
                    sh '/usr/bin/docker build -t playwright-runner .'

                    echo "Running Tests..."
                    try {
                        sh "/usr/bin/docker run --rm -e DISCORD_WEBHOOK_URL=${DISCORD_URL} playwright-runner"
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