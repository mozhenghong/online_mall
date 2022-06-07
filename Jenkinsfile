String buildNumber = env.BUILD_NUMBER;
String timestamp = new Date().format('yyyy-MM-dd_HH-mm-ss', TimeZone.getTimeZone('Asia/Shanghai'));
String projectName = env.JOB_NAME.split(/\//)[0];
String version = "onlineMall_${buildNumber}_${timestamp}_${projectName}.zip";

pipeline {
    agent any
    triggers {
       pollSCM('* * * * *')
    }
    stages {
        stage('Dependency & Build') {
            agent {
                docker { image 'node:16.15.0' }
            }
            steps {
                sh 'npm i'
                echo '🎉 Install Dependency Success 🎉'
                echo 'Starting to build'
                sh 'npm run build'
                sh 'ls -l'
                echo '🎉 Build Success 🎉'
                stash includes: 'dist/**/*', name: 'app'
            }
        }
        stage('Compress') {
            steps{
                unstash 'app'
                sh 'ls -l'
                script{ zip zipFile: "$version", archive: false, dir: 'dist' }
                archiveArtifacts artifacts: "$version", fingerprint: true
                sh 'ls -l'
                sh 'rm -rf dist'
                echo '🎉 Compress Success 🎉'
           }
        }
        stage('Deploy') {
            steps {
                sh 'ls -l'
//                 sh "scp $version root@101.35.43.9:/root/project/course/front-end"
//                 sh "ssh root@101.35.43.9 'ls -l /root/project/course/front-end'"
            }
        }
    }
}
