def serverIp = "101.35.43.9";
def projectPath = "/root/project/course/front-end";
def jenkinsSSHCredentialId = "cbdf5236-195e-400c-b413-5b5f791aa19e";

String buildNumber = env.BUILD_NUMBER;
String timestamp = new Date().format('yyyy-MM-dd_HH-mm-ss', TimeZone.getTimeZone('Asia/Shanghai'));
String projectName = env.JOB_NAME.split(/\//)[0];
String version = "onlineMall_${buildNumber}_${timestamp}_${projectName}.zip";

pipeline {
    agent {
        docker { image 'node:16.15.0' }
    }
    stages {
        stage('Dependency & Build') {
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
                script{ zip zipFile: "$version", archive: false, dir: 'dist' }
                archiveArtifacts artifacts: "$version", fingerprint: true
                sh 'rm -rf dist'
                echo '🎉 Compress Success 🎉'
           }
        }
       stage('Deploy') {
           steps {
               sshagent (credentials: ["$jenkinsSSHCredentialId"]) {
                   sh "scp -o StrictHostKeyChecking=no $version root@${serverIp}:${projectPath}"
                   sh "ssh -o StrictHostKeyChecking=no root@${serverIp} 'unzip -o ${projectPath}/${version}'"
                   echo "🎉 Deploy Success~ 🎉"
               }
           }
       }
    }
}
