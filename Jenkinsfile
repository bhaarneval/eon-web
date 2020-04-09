pipeline {
           

        // Mark the code checkout 'stage'....
        // stage ('Stage Checkout'){
            
        // Checkout code from repository and update any submodules
        // checkout scm
        // }

        stage ('Stage Build'){

        //compile the code
        sh """       
        npm install 
        npm run build
        """
        }        
        stage ('S3 Sync'){

        //uploading the the file to s3 bucket

            
                sh """
                aws s3 rm s3://${bucket_name}  --recursive
                aws s3 sync dist/ s3://${bucket_name}  
                """
     

        }
        //Clearing the cache of the cloudfront
        stage ('CloudFront Invalidation'){

            
                sh """
                aws cloudfront create-invalidation  --distribution-id ${cloudfront_distro_id}  --paths "/*"
                """
            
        }

    
}   
