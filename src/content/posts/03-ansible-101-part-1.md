---
title: "Ansible 101 - Part 1"
publishedAt: 2025-08-04
description: ""
slug: "ansible-101-part-1"
isPublish: true
---

In the fast-paced world of IT infrastructure and application management, automation has become a key player in simplifying tasks, reducing human errors, and enhancing efficiency. Ansible, a powerful open-source automation tool, has gained widespread popularity due to its simplicity and versatility. In this blog, we'll take you on a journey to understand the fundamentals of Ansible and help you get started with building your automation playbook.

## Introduction to Ansible: What is Ansible?

At its core, Ansible is an automation engine that simplifies complex IT tasks, allowing you to manage systems, deploy applications, and orchestrate tasks with ease. Ansible follows a declarative approach, meaning you describe the desired state of your systems rather than scripting the steps to achieve that state. This approach makes Ansible highly readable, understandable, and efficient.

### Key Features and Benefits of Ansible

1. **Agentless Architecture:** One of Ansible's standout features is its agentless architecture. Unlike some other automation tools, Ansible doesn't require agents to be installed on target systems. This reduces the management overhead and potential security concerns associated with agents.

2. **Simple and Human-Readable Syntax:** Ansible playbooks use YAML (Yet Another Markup Language), which is easy to read and write. This simplifies collaboration among team members and enables even those without extensive programming experience to contribute to automation.

3. **Idempotent Operations:** Ansible playbooks are idempotent, meaning you can run them multiple times without causing unintended side effects. This ensures that the playbook's actions are predictable and consistent.

4. **Wide Range of Modules:** Ansible provides a comprehensive library of modules that cover various tasks, from package installation and service management to cloud provisioning and network configuration.

5. **Infrastructure as Code (IaC):** Ansible allows you to define your infrastructure as code, enabling you to version control and share your automation codebase.

6. **Scalability and Orchestration:** Ansible can scale from managing a single server to orchestrating complex multi-tier applications across multiple servers and cloud platforms.

### Ansible Installation and Setup:

I will suggest you use a Linux environment or Mac for running DevOps tasks.

Use `pipx` in your environment to install the full Ansible package:

```bash
$ pipx install --include-deps ansible
```

You can install the minimal `ansible-core` package:

```bash
$ pipx install ansible-core
```

Alternatively, you can install a specific version of `ansible-core`:

```bash
$ pipx install ansible-core==2.12.3
```

** Creating a basic inventory file **

Create a file at /etc/ansible/hosts (the default location for Ansible’s inventory file), and add one server to it:

```bash
$ sudo mkdir /etc/ansible
$ sudo touch /etc/ansible/hosts
```

Edit this host file and add this content to the file :

```bash
[example]
www.example.com
```

where [example] is the group of servers and example.com is the server IP address. You can create a virtual machine in Azure or create a droplet in DigitalOcean and perform ansible task in it.

Ansible takes port 22 as the default port. So if you are not using port 22 you have to define it like this: www.example.com:2222 in your ssh config file.

**Advice :**

- I will suggest you create a virtual machine in the cloud or a digitalocean droplet and add it to the inventory to practice Ansible.

- You can also perform these tasks on killerkoda.com for free.

- Please avoid using a virtual box if your laptop configuration is not suitable.

### Running AdHoc commands

Run this command in the terminal :

```bash
$ ansible example -m ping -u [username]
```

where [isuername] is the user you use to log in to the server. This command will ping the domain example using the given username.

You can also do the same using ssh :

```bash
ssh username@www.example.com
```

You can check all the adhoc commands in the Ansible docs. In the next article, I will discuss how to write ansible playbooks.