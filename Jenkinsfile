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
            emailext body: """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>SUCCESS : Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""", mimeType: 'text/html', subject: "ESPM Dragon Blood job STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'", to: 'stephen.cherian@sap.com, biswaranjan.ray@sap.com'
        } 

        failure {  
            emailext body: """<p>STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>FAILURE : Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""", mimeType: 'text/html', subject: "ESPM Dragon Blood job STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'", to: 'stephen.cherian@sap.com , biswaranjan.ray@sap.com'
        }   
    }  
}
