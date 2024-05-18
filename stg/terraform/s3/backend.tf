# Create an S3 bucket

resource "aws_s3_bucket" "store-bucket" {
  bucket = "${var.bucket_name}"
}
