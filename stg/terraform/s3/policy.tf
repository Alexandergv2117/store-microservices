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
        ],
        Resource  = [
          "${aws_s3_bucket.store_bucket.arn}",
          "${aws_s3_bucket.store_bucket.arn}/*",
        ]
      }
    ]
  })
}
