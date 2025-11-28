---
title: "Ansible 101 - Part 2"
publishedAt: 2025-09-01
description: ""
slug: "ansible-101-part-2"
isPublish: true
---

## Writing Your First Ansible Playbooks: A Beginner's Guide

### Your First Ansible Playbook

Now that you understand the benefits of Ansible, let's create your first Ansible playbook. A playbook is a structured document that defines a set of tasks to be executed on target systems. Here's a step-by-step guide:

### Step 1: Install Ansible

First, you need to install Ansible on your control node (the machine where you'll write and execute playbooks). Ansible can be installed on Linux, macOS, or Windows Subsystem for Linux (WSL).

You can install Ansible using package managers like `apt`, `yum`, or `brew`, or use Python's package manager, `pip`.

### Step 2: Inventory

Ansible uses an inventory file to define the target hosts or groups of hosts where your playbooks will run. Create an inventory file (e.g., `inventory.yml`) and specify your target hosts in it. For example:

```bash
webserver:
  hosts:
    webserver1:
      ansible_host: 192.168.1.100
    webserver2:
      ansible_host: 192.168.1.101
```

In this example, we defined two web servers with their IP addresses.

### Step 3: Create a Playbook

Now it's time to create your playbook. Playbooks are written in YAML and consist of a series of tasks. Let's create a simple playbook to ensure the Nginx web server is installed and running on the target hosts.

```bash
- name: Install and start Nginx
  hosts: webserver
  become: yes

  tasks:
    - name: Update APT package cache
      apt:
        update_cache: yes

    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: Start Nginx
      service:
        name: nginx
        state: started
```

In this playbook:

- `name` provides a description of the playbook.

- `hosts` specify the target hosts or groups (in our case, the "webserver" group).

- `become: yes` indicates that we'll execute tasks with elevated privileges (sudo).

- The `tasks` section lists the individual tasks to be performed, such as updating the package cache, installing Nginx, and starting the Nginx service.

### Step 4: Run the Playbook

To run the playbook, use the `ansible-playbook` command:

```bash
ansible-playbook -i inventory.yml your_playbook.yml
```

Replace `inventory.yml` with the path to your inventory file and `your_playbook.yml` with the name of your playbook.

The Ansible engine will connect to the target hosts defined in your inventory and execute the tasks sequentially.

### Step 5: Verify

After running the playbook, you can verify the status of your target hosts. Open a web browser and enter the IP address of one of your web servers. If Nginx is correctly installed and running, you should see the default Nginx welcome page.

Congratulations! You've just executed your first Ansible playbook.

### Setting user and sudo options with ansible-playbook

If no remote_user is defined alongside the hosts in a playbook, Ansible assumes you’ll connect as the user-defined in your inventory file for a particular host, and then will fall back to your local user account name. You can explicitly define a remote user to use for remote plays using the --user (-u) option:

```bash
$ ansible-playbook playbook.yml --user=johndoe
```

In some situations, you will need to pass along your sudo password to the remote server to perform commands via sudo. In these situations, you’ll need to use the --ask-become-pass (-K) option. You can also explicitly force all tasks in a playbook to use sudo with --become (-b). Finally, you can define the sudo user for tasks run via sudo (the default is root) with the --become-user (-U) option.

the following command will run our example playbook with sudo, performing the tasks as the sudo user janedoe, and Ansible will prompt you for the sudo password:

```bash
$ ansible-playbook playbook.yml --become --become-user=janedoe 
--ask-become-pass
```
