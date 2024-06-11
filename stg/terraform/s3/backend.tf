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

resource "aws_s3_bucket_policy" "bucket_policy" {
  depends_on = [
    aws_s3_bucket_public_access_block.bucket-public-access-block,
  ]

  bucket = aws_s3_bucket.store_bucket.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = [
          "s3:GetObject",
          "s3:ListBucket",
          "s3:PutObject",
        ],
        Resource  = [
          "${aws_s3_bucket.store_bucket.arn}",
          "${aws_s3_bucket.store_bucket.arn}/*",
        ]
      }
    ]
  })
}

output "bucket_name" {
  value = aws_s3_bucket.store_bucket.bucket
}

output "bucket_url" {
  value = "https://${aws_s3_bucket.store_bucket.bucket}.s3.amazonaws.com"
}