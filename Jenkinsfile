pipeline {
    agent any

    environment {
        IMAGE_NAME = 'prinzkay/testimonial-slider'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'testimonial'
        PORT = '8888'

    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/KamzyPrinzel/Testimonial-Slider.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Build Docker image using shell commands
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                    
                    // Stop and remove old container if exists
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    
                    // Run new container
                    sh "docker run -d -p ${PORT}:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                             docker tag prinzkay/testimonial-slider:${BUILD_NUMBER} prinzkay/testimonial-slider:latest
                    
                            # Push both versions
                            docker push prinzkay/testimonial-slider:${BUILD_NUMBER}
                            docker push prinzkay/testimonial-slider:latest
                        """
                    }
                }
            }
        }

    }

    post {
        always {
            echo 'Cleaning up workspace'
            cleanWs()
        }
    }
}