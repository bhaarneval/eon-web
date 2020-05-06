pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
		sh 'npm run build'
		sh 'npm test'
            }
        }
        stage('Pushing to S3') {
            steps {
		    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '9456246c-36e8-4681-8e3e-ecdfc03e111c']]) {
		sh 'aws s3 ls'
                sh 'aws s3 rm s3://${bucket_name}  --recursive'
                sh 'aws s3 sync build/ s3://${bucket_name}'
		}
            }
	}
        stage('Cloudfront invalidation') {
            steps {
		withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '9456246c-36e8-4681-8e3e-ecdfc03e111c']]) {
		sh 'aws cloudfront create-invalidation  --distribution-id ${cloudfront_distro_id}  --paths "/*"'
		}
            }
        }
    }
}
