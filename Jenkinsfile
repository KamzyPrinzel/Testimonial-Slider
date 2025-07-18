pipeline {
    agent any

    environment {
        IMAGE_NAME = 'prinzkay/testimonial-slider'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'testimonial'
        PORT = '8080'
        FULL_IMAGE = "${IMAGE_NAME}:${IMAGE_TAG}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout from Git') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/KamzyPrinzel/Testimonial-Slider.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${env.FULL_IMAGE}")
                    sh "docker tag ${env.FULL_IMAGE} ${env.IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker stop ${env.CONTAINER_NAME} || true"
                    sh "docker rm ${env.CONTAINER_NAME} || true"
                    sh """
                    docker run -d \
                      -p ${env.PORT}:80 \
                      --name ${env.CONTAINER_NAME} \
                      --health-cmd="curl --fail http://localhost:80 || exit 1" \
                      --health-interval=30s \
                      ${env.FULL_IMAGE}
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PASS}
                        docker push ${env.FULL_IMAGE}
                        docker push ${env.IMAGE_NAME}:latest
                        docker logout
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed - cleaning up'
            sh 'docker system prune -f'
        }
        success {
            echo 'Pipeline succeeded!'
            // Add notification here (email, Slack, etc.)
        }
        failure {
            echo 'Pipeline failed!'
            // Add failure notification
        }
    }
}