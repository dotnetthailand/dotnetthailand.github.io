---
title: Docker Machine
showMetadata: true
editable: true
showToc: true
---
# The Docker-Machine.

Docker machine is a tool that lets you install Docker Engine on your virtual host or event Remote host at your cloud provider.

This content will be talking about AWS cloud providers.

It feels tedious when you want quickly spin up the prototype application using Docker. You might create and install tons of prerequisites. This thing is going to be fine if you have a lot of time. By the way, you don't have much time. What'd you like to do?

Exactly, Docker Machine will help you a lot. So I will describe some tips starting from the beginning.

If you want to know more about Docker-Machine and how does it work, please click this link.

https://docs.docker.com/machine/#what-is-docker-machine

In this article, I'd like to introduce you to the real-world usage of Docker Machine relies on the AWS EC2.

First thing first, Install your docker machine to your machine. Please follow this link.

https://docs.docker.com/machine/install-machine/

In the next step, Copy and Paste this command onto your terminal.

```sh
docker-machine create ${YOUR_MACHINE_NAME} \
--driver amazonec2 \
--amazonec2-region ap-southeast-1 \
--amazonec2-open-port 27017 \
--amazonec2-security-group security-my-awesome-ec2-project \
--amazonec2-vpc-id \
--amazonec2-subnet-id subnet-1 \
--amazonec2-subnet-id subnet-2 \
--amazonec2-private-address-only \
--amazonec2-zone b \
--amazonec2-zone c \
--amazonec2-instance-type t3a.medium
```

At this point, you might be a bit confused, So, lets me explain those arguments to you line by line.

Yeah, you may already know what's this line does.

```sh
docker-machine create my-awesome-ec2-project \
--driver amazonec2 \
```

This line allowed you to create a new instance Ubuntu machine, describing which region to settle down.

By the way, If you've already configured the AWS Access Key and Secret Key for using at the AWS CLI's local machine. The Docker Machine command will bring on those kinds of secret keys from your system automatically.

```sh
--amazonec2-open-port 27017 \
--amazonec2-open-port 80 \
```


The definition of this parameter opens port 27017 and port 80. In addition, these arguments set the security group for HTTP on our ec2 instance.

Next, What about EC2 networking between the cluster. How argument pattern should we set? OK, take a look.

```sh
--amazonec2-security-group ${YOUR_SECURITY_GROUP_NAME} \
--amazonec2-vpc-id ${YOUR_EXIST_VPC_ID} \
--amazonec2-subnet-id ${YOUR_SUBNET_ID} \
--amazonec2-private-address-only \
--amazonec2-zone b \
--amazonec2-zone c \
--amazonec2-region ap-southeast-1 \
```

Which argument means, You specify the security group with your name. Apply the VPC networking and assign a private IP address in a range of the SubnetId. After that, deploy the EC2 instance into the B and C zone around your specific region (ap-southeast-1).

```sh
--amazonec2-instance-type t3a.medium
```

This argument specifies the instance type of Docker Machine; It will create AMD CPU type of machine. For example, this instance has chosen the EC2's spec type in t3a.medium (Cost that you should pay for EC2 instance at least 29.00 USD/month).

These are arguments. You can tune up your instance Docker Machine. as such depends on your budget that you are comfortable paying for a project.

After that, you execute the command, assume that you haven't received any error issues while creating the machine. Lastly, Typing a command for reaching the host already build and run onto the AWS EC2.

Example

```sh
$ docker-machine ls -t 12
NAME                          ACTIVE   DRIVER      STATE     URL                     SWARM   DOCKER     ERRORS
my-awesome-project   -        amazonec2   Running   tcp://127.0.0.1:2376           v20.10.5
```

Finally, It's time to connect and access for playing around with your machine. You can use the command eval that makes a secure connection between your local computer and the virtual server onto AWS EC2.

Example
```sh
$ eval $(docker-machine env my-awesome-project)
```

In a word, The Docker machine has a massive impact and saves your time in the purpose of spring your project that makes either experimental your proof of your business and concept or It good enough for the small production project. Moreover, the Docker-Machine so friendly and intuitive for using with non-Dev-Ops. Although you are a Front-End developer, You should prepare some servers for delivering your project.
