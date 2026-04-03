pipeline {
    agent any
    
    environment {
        DISCORD_URL = credentials('discord-webhook-url')
        // Force the PATH to include common binary locations
        PATH = "/usr/bin:/usr/local/bin:/bin:/usr/sbin:/sbin:${PATH}"
    }

    stages {
        stage('Build & Run Playwright') {
            steps {
                script {
                    echo "Checking environment..."
                    sh 'ls -l /usr/bin/docker || echo "STILL NOT VISIBLE"'
                    
                    echo "Building the Playwright Image..."
                    sh 'docker build -t playwright-runner .'
                    
                    try {
                        sh "docker run --rm -e DISCORD_WEBHOOK_URL=${DISCORD_URL} playwright-runner"
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}