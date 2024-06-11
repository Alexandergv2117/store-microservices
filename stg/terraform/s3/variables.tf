variable "access_key" {
  type = string
  description = "AWS access key"
}

variable "secret_key" {
  type = string
  description = "AWS secret key"
}

variable "region" {
  type = string
  default = "us-west-1"
  description = "AWS region"
}

variable "bucket_name" {
  type = string
  description = "S3 bucket name"
}