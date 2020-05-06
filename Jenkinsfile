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
		    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: '${AWS_CREDENTIALS}']]) {
		sh 'aws s3 ls'
                sh 'aws s3 rm s3://${bucket_name}  --recursive'
                sh 'aws s3 sync build/ s3://${bucket_name}'
		}
            }
	}
        stage('Cloudfront invalidation') {
            steps {
		withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'da6ee98b-75e9-4e90-b6d9-61fc5387f891']]) {
		sh 'aws cloudfront create-invalidation  --distribution-id ${cloudfront_distro_id}  --paths "/*"'
		}
            }
        }
    }
}
