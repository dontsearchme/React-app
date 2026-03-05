pipeline {
agent any

```
environment {
    DOCKER_HUB_REPO = "yuvarajrolex/react-app"
    EC2_IP = "13.126.82.210"
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
            bat "docker build -t %DOCKER_HUB_REPO%:latest ."
        }
    }

    stage('Push to Docker Hub') {
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'dockerhub-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {

                bat """
                echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                docker push %DOCKER_HUB_REPO%:latest
                """
            }
        }
    }

    stage('Deploy to EC2') {
        steps {
            withCredentials([sshUserPrivateKey(
                credentialsId: 'ec2-ssh-key',
                keyFileVariable: 'SSH_KEY'
            )]) {

                bat """
                ssh -o StrictHostKeyChecking=no -i %SSH_KEY% %EC2_USER%@%EC2_IP% ^
                "docker pull %DOCKER_HUB_REPO%:latest && ^
                docker stop react-app || exit 0 && ^
                docker rm react-app || exit 0 && ^
                docker run -d -p 3000:3000 --name react-app %DOCKER_HUB_REPO%:latest"
                """
            }
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
```

}
