# Create an S3 bucket

resource "aws_s3_bucket" "store_bucket" {
  bucket = "${var.bucket_name}"
  force_destroy = true # This will allow the bucket to be destroyed even if it contains objects
}

resource "aws_s3_bucket_public_access_block" "bucket-public-access-block" {
  bucket = aws_s3_bucket.store_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
