
pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = "yuvarajrolex/react-app"
        EC2_IP = "3.109.32.132"
        EC2_USER = "ec2-user"
    }

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/dontsearchme/React-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_HUB_REPO}:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push ${DOCKER_HUB_REPO}:latest'
                }
            }
        }

        stage('Deploy to EC2') {
    steps {
        sh '''
            ssh -o StrictHostKeyChecking=no \
            -i /var/lib/jenkins/rolex.pem \
            ${EC2_USER}@${EC2_IP} "
            docker pull ${DOCKER_HUB_REPO}:latest &&
            docker stop react-app || true &&
            docker rm react-app || true &&
            docker run -d -p 80:80 --name react-app ${DOCKER_HUB_REPO}:latest
            "
        '''
    }
}
    }

    post {
        success {
            echo 'Pipeline completed — React app deployed successfully!'
        }
        failure {
            echo 'Pipeline failed — check logs above.'
        }
    }
}
