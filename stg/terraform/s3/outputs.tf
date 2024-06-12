output "bucket_name" {
  value = aws_s3_bucket.store_bucket.bucket
}

output "bucket_url" {
  value = "https://${aws_s3_bucket.store_bucket.bucket}.s3.amazonaws.com"
}

output "s3_user_access_key_id" {
  value = aws_iam_access_key.s3_user_access_key.id
  description = "Access Key ID for the s3_user"
}

output "s3_user_secret_access_key" {
  value       = aws_iam_access_key.s3_user_access_key.secret
  description = "Secret Access Key for the s3_user"
  sensitive   = true
}
