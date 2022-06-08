#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                deleteDir()
                checkout scm
                script{
                   
                        sh "mbt build -p=cloud"
                }
            }
        }
    }
    post {  
        success {  
            echo "Success"
        } 

        failure {  
            echo "Build Failed"
        }   
    }  
}
