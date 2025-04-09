terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.16"
        }
    }
    required_version = ">= 1.2.0"
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_instance" "server_producao" {
    ami = "ami-084568db4383264d4"
    instance_type = "t2.micro"

    tags = {
        Name = "InstânciaProduçãoAplicação"
    }
}

resource "aws_instance" "server_bd" {
    ami = "ami-084568db4383264d4"
    instance_type = "t2.micro"

    tags = {
        Name = "InstânciaProduçãoBD"
    }
}

resource "aws_s3_bucket" "s3_raw" {
  bucket = "bucket-raw-tradeflux"

  tags = {
    Name = "BucketRawTradeFlux"
  }
}

resource "aws_s3_bucket" "s3_trusted" {
  bucket = "bucket-trusted-tradeflux"

  tags = {
    Name = "BucketRawTradeFlux"
  }
  
}

resource "aws_s3_bucket" "s3_client" {
  bucket = "bucket-client-tradeflux"

  tags = {
    Name = "BucketRawTradeFlux"
  }
  
}