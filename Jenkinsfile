pipeline {
    agent any

    environment {
        IMAGE_NAME = 'prinzkay/testimonial-slider'
        IMAGE_TAG = "${BUILD_NUMBER}"
        FULL_IMAGE = "${IMAGE_NAME}:${IMAGE_TAG}"
        CONTAINER_NAME = 'testimonial'
        PORT = '8080'
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
                    docker.build("${FULL_IMAGE}")
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker run -d -p ${PORT}:80 --name ${CONTAINER_NAME} ${FULL_IMAGE}"
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
                        docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                        docker push ${FULL_IMAGE}
                        docker logout
                    """
                }
            }
        }
    }
}
