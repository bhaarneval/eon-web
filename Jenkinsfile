pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
		sh 'npm run build'
            }
        }
        stage('Pushing to S3') {
            steps {
		sh 'aws s3 get-login --no-include-email --region ap-south-1'
                sh 'aws s3 rm s3://${bucket_name}  --recursive'
                sh 'aws s3 sync build/ s3://${bucket_name}'
            }
        }
        stage('Cloudfront invalidation') {
            steps {
                sh 'aws cloudfront create-invalidation  --distribution-id ${cloudfront_distro_id}  --paths "/*"'
            }
        }
    }
}
