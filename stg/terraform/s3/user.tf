resource "aws_iam_user" "s3_user" {
  name = "s3_user_store_stg"

  tags = {
    Name = "s3_user"
  }
}

resource "aws_iam_access_key" "s3_user_access_key" {
  user = aws_iam_user.s3_user.name
}

data "aws_iam_policy_document" "s3_user_policy" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
      "s3:PutObject",
    ]

    resources = [
      aws_s3_bucket.store_bucket.arn,
      "${aws_s3_bucket.store_bucket.arn}/*",
    ]
  }
}

resource "aws_iam_user_policy" "s3_user_policy" {
  name = "s3_user_store_stg_policy"
  user = aws_iam_user.s3_user.name
  policy = data.aws_iam_policy_document.s3_user_policy.json
}
