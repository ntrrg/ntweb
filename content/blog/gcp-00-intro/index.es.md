---
title: Introducción a Google Cloud Platform
date: 2020-04-09T12:30:00-04:00
description: Computación en la Nube con la ayuda de uno de los gigantes de Internet. Conceptos básicos y una reseña histórica de Google Cloud Platform.
tags:
  - tecnología
  - cloud
  - gcp
  - sysadmin
  - devops
series:
  - Cloud Engineering (GCP)
comments: true
toc: true
draft: true
---

# Conceptos básicos

El elemento principal de la plataforma son los proyectos, un proyecto es un
conjunto de participantes, recursos y servicios que darán vida a una o varias
aplicaciones. Es posible tener muchas aplicaciones dentro de un solo proyecto,
pero se recomienda mantener esta cantidad distribuida entre diferentes
proyectos para facilitar su mantenimiento e impulsar la productividad de los
miembros del equipo.

Los recursos y servicios son todas las utilidades que ofrece la plataforma,
entre ellas máquinas virtuales, orquestadores de contenedores, bases de datos,
dispositivos de almacenamiento, herramientas de monitoreo y muchísimas cosas
más. También incluyen APIs como la de Google Maps y las de inteligencia
artificial para el reconocimiento de voz y procesamiento de imágenes.

Ya que la Computación en la Nube promueve el alcance global de las
aplicaciones, es muy común que al momento de solicitar recursos se deba indicar
la región y la zona en la que se quieren desplegar. Estos atributos no son más
que la ubicación geográfica de los centros de datos de Google donde correrá el
recurso.

Los participantes del proyecto son usuarios a los que se les pueden asignar
roles específicos que les permitirán interactuar con los recursos del proyecto.
También es posible crear cuentas de servicio, estas pueden ser usadas por
aplicaciones para acceder y hasta manejar los recursos del proyecto.

# Control de Indetidades y Acceso (IAM)

Entre lo roles predefinidos se encuentran:

* *Observador (Viewer):*

* *Editor (Editor):*

* *Propietario (Owner):*

# Interfaces de Usuario

## Consola

## CLIs (`gcloud`, `gsutil`, `bq`)

```shell-session
$ gcloud init [--console-only]

$ gcloud info

$ gcloud components list

$ gcloud components install beta
$ gcloud beta GROUP

$ gcloud components install alpha
$ gcloud alpha GROUP

$ gcloud services enable SERVICE
```

Configuration

```shell-session
$ export GCP_PROJECT="..."
$ export GCP_REGION="us-central1"
$ export GCP_ZONE="$GCP_REGION-a"

$ gcloud config list [--all] [KEY]
$ gcloud config get-value KEY
$ gcloud config set KEY VALUE
$ gcloud config set project "$GCP_PROJECT"
$ gcloud config set GROUP/region "$GCP_REGION"
$ gcloud config set GROUP/zone "$GCP_ZONE"
```

### IAM

```shell-session
$ gcloud auth list

$ gcloud auth login [ACCOUNT]
```

Service accounts

```shell-session
$ gcloud iam service-accounts create NAME [--display-name DISPLAY_NAME]

$ gcloud projects add-iam-policy-binding PROJECT_ID \
    --member serviceAccount:ACCOUNT@PROJECT_ID.iam.gserviceaccount.com \
    --role ROLE

$ gcloud iam service-accounts disable NAME

$ gcloud iam service-accounts enable NAME

$ # Get access token

$ gcloud iam service-accounts keys create key.json --iam-account ACCOUNT

$ gcloud auth activate-service-account --key-file key.json

$ gcloud auth print-access-token
```

### Tools

#### Git repositories

```shell-session
$ gcloud source repos create NAME

$ gcloud source repos clone NAME
```

### Computing

#### Compute Engine (GCE)

```shell-session
$ gcloud compute project-info describe --project PROJECT_ID

$ gcloud compute ssh [USER@]NAME [--zone ZONE] [--command COMMAND] \
    [--internal-ip | --tunnel-through-iap]
```

Virtual machines

```shell-session
$ gcloud compute images list [--project IMAGE_PROJECT] [--no-standard-images]

$ gcloud compute instances create NAME [--preemptible] \
    [--image-project IMAGE_PROJECT --image IMAGE] \
    [--machine-type TYPE] [--zone ZONE] [--tags TAGS] \
    [--boot-disk-type pd-standard|pd-ssd] [--boot-disk-size SIZE] \
    [--no-boot-disk-auto-delete] \
    [--disk [name=DISK],[device-name=NAME],[mode=rw|ro],[auto-delete=yes|no] \
    [--local-ssd=[device-name=NAME],[interface=SCSI|NVME]]
    [--network NETWORK --subnet SUBNETWORK | --network-interface KEY=VALUE] \
    [--address ADDRESS | --no-address] [--can-ip-forward] \
    [--metadata KEY=VALUE] [--metadata-from-file KEY=PATH] \
    [--labels KEY=VALUE]

$ gcloud compute instances create-with-container NAME [--preemptible] \
    --image-project cos-cloud --image IMAGE \
    --container-image CONTAINER_IMAGE \
    [--machine-type TYPE] [--zone ZONE] [--tags TAGS] \
    [--boot-disk-type pd-standard|pd-ssd] [--boot-disk-size SIZE] \
    [--no-boot-disk-auto-delete] \
    [--network NETWORK --subnet SUBNETWORK | --network-interface KEY=VALUE] \
    [--address ADDRESS | --no-address] [--can-ip-forward] \
    [--container-restart-policy never|on-failure|always] \
    [--container-env KEY=VALUE] [--container-env-file PATH] \
    [--container-mount-host-path host-path=PATH,mount-path=PATH[,mode=(rw|ro)] \
    [--container-mount-tmpfs=mount-path=MOUNTPATH] \
    [--container-stdin] [--container-tty] [--container-privileged] \
    [--container-arg ARGS] [--container-command ENTRYPOINT] \
    [--labels KEY=VALUE]

$ gcloud compute target-instances create NAME --instance INSTANCE

$ gcloud compute instances attach-disk INSTANCE [--zone ZONE] --disk DISK \
    [--device-name NAME] [--mode rw|ro]
```

Unmanaged groups

```shell-session
$ gcloud compute instance-groups unmanaged create NAME \
    [--zone ZONE] --instances INSTANCES
```

Managed groups

```shell-session
$ gcloud compute instance-templates create NAME [--preemptible] \
    [--image-project IMAGE_PROJECT --image IMAGE] \
    [--machine-type TYPE] [--region REGION] [--tags TAGS] \
    [--boot-disk-type pd-standard|pd-ssd] [--boot-disk-size SIZE] \
    [--no-boot-disk-auto-delete] \
    [--disk [name=DISK],[device-name=NAME],[mode=rw|ro],[auto-delete=yes|no] \
    [--local-ssd=[device-name=NAME],[interface=SCSI|NVME]]
    [--network NETWORK --subnet SUBNETWORK | --network-interface KEY=VALUE] \
    [--address ADDRESS | --no-address] [--can-ip-forward] \
    [--metadata KEY=VALUE] [--metadata-from-file KEY=PATH] \
    [--labels KEY=VALUE]

$ gcloud compute target-pools create NAME [--region REGION]

$ gcloud compute instance-groups managed create NAME \
    [--region REGION --zones ZONES | --zone ZONE] \
    --template TEMPLATE --size SIZE \
    [--health-check HEALTH_CHECK --initial-delay TIME] \
    [--target-pool POOL] \
    [--base-instance-name PREFIX] [--description DESCRIPTION]

$ gcloud compute instance-groups managed set-autoscaling GROUP \
    [--region REGION | --zone ZONE] [--mode off|on|only-up] \
    [--min-num-replicas REPLICAS] --max-num-replicas REPLICAS \
    {--scale-based-on-cpu --target-cpu-utilization 0.0-1.0 | \
    --scale-based-on-load-balancing --target-load-balancing-utilization RATE | \
    --custom-metric-utilization [metric=METRIC],[utilization-target=VALUE],[utilization-target-type="DELTA_PER_MINUTE"|"DELTA_PER_SECOND"|"GAUGE"]} \
    --cool-down-period TIME \
    [--description DESCRIPTION]
```

#### Kubernetes Engine (GKE)

```shell-session
$ gcloud container clusters create NAME [--zone ZONE | --region REGION] \
    [--cluster-version VERSION] [--node-version VERSION] \
    [--num-nodes NODES] [--node-locations ZONES] \
    [--machine-type TYPE] [--tags TAGS] [--preemptible] \
    [--disk-type pd-standard|pd-ssd] [--disk-size SIZE] \
    [--network NETWORK] [--subnetwork SUBNETWORK] \
    [--address ADDRESS | --no-address] \
    [--enable-stackdriver-kubernetes] \
    [--metadata KEY=VALUE] [--metadata-from-file KEY=PATH] \
    [--labels KEY=VALUE]

$ gcloud auth configure-docker

$ gcloud container clusters get-credentials NAME \
    (--zone ZONE | --region REGION)
```

Private cluster

```shell-session
$ gcloud container clusters create NAME [--zone ZONE | --region REGION] \
    [--cluster-version VERSION] [--node-version VERSION] \
    [--num-nodes NODES] [--node-locations ZONES] \
    [--machine-type TYPE] [--tags TAGS] [--preemptible] \
    [--disk-type pd-standard|pd-ssd] [--disk-size SIZE] \
    [--network NETWORK] --create-subnetwork [name=SUBNETWORK][,][range=RANGE] \
    --master-ipv4-cidr 172.16.0.16/28 \
    --enable-private-nodes --enable-ip-alias \
    [--enable-tpu] [--enable-stackdriver-kubernetes] \
    [--metadata KEY=VALUE] [--metadata-from-file KEY=PATH] \
    [--labels KEY=VALUE]

$ gcloud container clusters update CLUSTER \
    --enable-master-authorized-networks \
    --master-authorized-networks RANGE

$ gcloud auth configure-docker

$ gcloud container clusters get-credentials NAME \
    (--zone ZONE | --region REGION)
```

Kubernetes

```shellsession
$ kubectl create serviceaccount NAME [--namespace NAMESPACE]

$ kubectl create clusterrolebinding NAME \
    --clusterrole ROLE --user [NAMESPACE:]ACCOUNT

$ kubectl create ns NAME

$ kubectl get nodes

$ kubectl get services

$ kubectl get deployments

$ kubectl get replicasets

$ kubectl get pods [--show-labels] [-l LABELS]

$ kubectl explain OBJECT

$ kubectl create -f PATH [-n NAMESPACE]

$ kubectl apply -f PATH [-n NAMESPACE]

$ kubectl edit deployments NAME

$ # Rollouts

$ kubectl rollout history OBJECT

$ kubectl rollout status OBJECT

$ kubectl rollout pause OBJECT

$ kubectl rollout resume OBJECT

$ kubectl rollout undo OBJECT

$ # Secrets

$ kubectl create secret generic tls-certs --from-file tls/

$ kubectl create configmap nginx-frontend-conf --from-file=nginx/frontend.conf

$ # Manual management

$ kubectl create deployments NAME --image CONTAINER_IMAGE

$ kubectl exec POD --stdin --tty -c CONTAINER COMMAND

$ kubectl label pods POD LABELS

$ kubectl expose deployments NAME \
    --protocol (TCP|UDP) --port PORT [--target-port CONTAINER_PORT] \
    [--type ClusterIP|NodePort|LoadBalancer]

$ kubectl scale deployments NAME --replicas REPLICAS
```

Helm

```shell-sesion
$ kubectl create serviceaccount helm --namespace kube-system

$ kubectl create clusterrolebinding helm-admin-binding \
    --clusterrole=cluster-admin --serviceaccount=kube-system:helm

$ helm init --service-account helm

$ helm repo update

$ helm install REPO --name NAME --version VERSION -f PATH --wait
```

Terraform

```shell-sesion
$ terraform fmt

$ terraform init

$ terraform plan

$ terraform apply
```

#### App Engine (GAE)

```shell-session
$ git clone https://github.com/GoogleCloudPlatform/golang-samples.git

$ cd golang-samples/appengine/go11x/helloworld

$ gcloud components install app-engine-go

$ gcloud app deploy [FILE] [--bucket BUCKET] [--ignore-file FILE]

$ gcloud app browse [--no-promote]

$ gcloud app logs read [--service default] [--limit LIMIT] \
    [--logs stderr,stdout,crash.log,nginx.request,request_log] \
    [--level critical|error|warning|info|debug|any]

$ gcloud app logs tail [--service default] \
    [--logs stderr,stdout,crash.log,nginx.request,request_log] \
    [--level critical|error|warning|info|debug|any]
```

#### Functions (GCF)

```shell-session
$ gcloud functions describe NAME

$ gcloud functions event-types list

$ gcloud functions deploy NAME [--region REGION] \
    [--source DIR] --stage-bucket BUCKET \
    --runtime (nodejs8|nodejs10|python37|go111|go113) \
    [--entry-point FUNCTION_NAME_IN_SOURCE] \
    [--clear-env-vars | --env-vars-file FILE | --set-env-vars KEY=VALUE] \
    [--remove-env-vars KEYS] [--update-env-vars KEY=VALUE] \
    [--memory (128|256|512|1024|2048)MB] [--timeout SECONDS] \
    [--max-instances INSTANCES | --clear-max-instances] \
    [--allow-unauthenticated] \
    [--trigger-bucket BUCKET | --trigger-topic PUBSUB_TOPIC |
    (--trigger-event EVENT --trigger-resource RESOURCE) |
    --trigger-http ] \
    [--update-labels KEY=VALUE]

$ gcloud functions call NAME [--region REGION] --data JSON_DATA

$ gcloud functions logs read NAME [--region REGION] \
    [--start-time START_TIME] [--end-time END_TIME] \
    [--min-log-level debug|info|error] \
    [--filter EXPRESSION] [--page-size SIZE] [--limit LIMIT] [--sort-by FIELD]
```

### Networking

#### IP addresses

```shell-session
$ gcloud compute addresses create NAME \
    [--ip-version (IPV4|IPV6)] \
    [--addresses ADDRESSES] [--prefix-length PREFIX] \
    [--network NETWORK | --subnet SUBNETWORK] \
    (--region REGION | --global)
```

#### Networks

```shell-session
$ gcloud compute networks create NAME --subnet-mode default|auto|custom \
    [--bgp-routing-mode regional|global]

$ gcloud compute networks update NAME --switch-to-custom-subnet-mode
```

#### Subnets

```shell-session
$ gcloud compute networks subnets create NAME \
    --network NETWORK --region REGION --range RANGE \
    [--secondary-range NAME=RANGE] [--enable-private-ip-google-acces]

$ gcloud compute networks subnets expand-ip-range NAME --region REGION \
    --prefix-lenght PREFIX
```

#### Firewall rules

```shell-session
$ gcloud compute firewall-rules list

$ gcloud compute firewall-rules create NAME \
    [--network NETWORK] [--direction INGRESS|EGRESS] \
    [--source-ranges IP_RANGE] [--source-tags TAGS] [--target-tags TAGS] \
    (--allow (tcp|udp|icmp)[:PORT[-PORT]]] |
    --action ALLOW|DENY --rules (tcp|udp|icmp)[:PORT[-PORT]])

$ gcloud compute firewall-rules create default-allow-health-check \
    --network default \
    --source-ranges 130.211.0.0/22,35.191.0.0/16,209.85.152.0/22,209.85.204.0/22 \
    --target-tags health-check-target --allow tcp

$ gcloud compute firewall-rules create default-allow-ssh-iap-tunnel \
    --network default --source-ranges 35.235.240.0/20 --allow tcp:22
```

#### Security policies

```shell-session
$ gcloud compute security-policies create NAME \
    [--description DESCRIPTION] [--file-name PATH [--file-format FORMAT]]

$ gcloud compute security-policies rules create PRIORITY \
    {--expression EXPRESSION | --src-ip-ranges RANGES} \
    --security-policy POLICY --action allow|deny-403|deny-404|deny-502 \
    [--description DESCRIPTION] [--preview]

$ gcloud compute backend-services update BACKEND --security-policy POLICY
```

#### Forwarding rules

```shell-session
$ gcloud compute forwarding-rules list
```

Protocol Forwarding (single VM)

```shell-session
$ gcloud compute forwarding-rules create NAME \
    [--address IP_ADDRESS] [--ip-protocol (TCP|UDP)] \
    --ports PORTS --target-instance INSTANCE \
    (--region REGION | --global)
```

Internal L3 Load Balancer (VMs pool)

```shell-session
$ gcloud compute health-checks create PROTOCOL NAME \
    [--host HOST_HEADER] [--request-path PATH] [--port PORT] \
    [--check-interval TIME] [--timeout TIME] \
    [--healthy-threshold COUNT] [--unhealthy-threshold COUNT] \
    [--description DESCRIPTION]

$ gcloud compute backend-services create NAME \
    --load-balancing-scheme "INTERNAL"
    --protocol TCP|UDP [--session-affinity "CLIENT_IP"] \
    [--health-checks HEALTH_CHECK] \
    --region REGION

$ gcloud compute backend-services add-backend NAME \
    ---instance-group-zone ZONE -instance-group GROUP \
    --global

$ gcloud compute forwarding-rules create NAME \
    --load-balancing-scheme "INTERNAL" \
    --network NETWORK --subentwork SUBNETWORK \
    [--address IP_ADDRESS] [--ip-protocol (TCP|UDP)] --ports PORTS \
    --backend-service-region REGION --backend-service BACKEND
    --region REGION
```

Network L3 Load Balancer (VMs pool)

```shell-session
$ gcloud compute forwarding-rules create NAME \
    [--address IP_ADDRESS] [--ip-protocol (TCP|UDP)] \
    --ports PORTS --target-pool POOL \
    --region REGION
```

Global HTTP/HTTPS/HTTP2 L7 Load Balancer (VMs group)

```shell-session
$ gcloud compute instance-groups (managed | unmanaged) set-named-ports GROUP \
    --named-ports (http|https|http2):PORT [--zone ZONE | --region REGION]

$ gcloud compute (http-health-checks | https-health-checks) create NAME \
    [--host HOST_HEADER] [--request-path PATH] [--port PORT] \
    [--check-interval TIME] [--timeout TIME] \
    [--healthy-threshold COUNT] [--unhealthy-threshold COUNT] \
    [--description DESCRIPTION]

$ gcloud compute backend-services create NAME \
    --protocol (HTTP|HTTPS|HTTP2) [--session-affinity "CLIENT_IP"] \
    (--http-health-checks | --https-health-checks) HEALTH_CHECK \
    --global

$ gcloud compute backend-services add-backend NAME \
    ---instance-group-zone ZONE -instance-group GROUP \
    --global

$ gcloud compute url-maps create NAME --default-service BACKEND

$ gcloud compute url-maps add-path-matcher URLMAP \
  --default-service BACKEND \
  --path-matcher-name NAME --path-rules="PATH=BACKEND"

$ # HTTP

$ gcloud compute target-http-proxies create NAME --url-map URLMAP

$ gcloud compute forwarding-rules create NAME [--address IP_ADDRESS] \
    --ports PORTS --target-http-proxy PROXY \
    --global

$ # HTTPS

$ gcloud compute ssl-certificates create NAME \
    --private-key FILE --certificate FILE

$ gcloud compute target-https-proxies create NAME \
    --url-map URLMAP --ssl-certificates CERTS

$ gcloud compute forwarding-rules create NAME [--address IP_ADDRESS] \
    --ports PORTS --target-https-proxy PROXY \
    --global
```

#### VPC Network Peering

```shell-session
$ gcloud compute networks peerings create NAME --auto-create-routes \
    --network NETWORK --peer-network PEER_NETWORK [--peer-project PROJECT]
```

#### Routes

```shell-session
$ gcloud compute routes create NAME --network NETWORK \
    --destination-range RANGE --priority PRIORITY [--tags TAGS] \
    (--next-hop-gateway default-internet-gateway | \
    --next-hop-address IP_ADDRESS | \
    [--next-hop-ilb-region REGION] --next-hop-ilb FORWARDING_RULE | \
    [--next-hop-instance-zone ZONE] --next-hop-instance INSTANCE | \
    [--next-hop-vpn-tunnel-region REGION] --next-hop-vpn-tunnel VPN_TUNNEL)
```

#### Routers

```shell-session
$ gcloud compute routers create NAME [--region REGION] --network NETWORK \
    [--advertisement-mode "DEFAULT"|"CUSTOM"] \
    [--set-advertisement-groups ALL_SUBNETS |
    --set-advertisement-ranges RANGE[=DESCRIPTION]] \
    [--description DESCRIPTION]
```

#### NAT

```shell-session
$ gcloud compute routers nats create NAME [--region REGION] --router ROUTER \
    {--auto-allocate-nat-external-ips | --nat-external-ip-pool IP_ADDRESS}
```

#### VPN

```shell-session
$ gcloud compute target-vpn-gateways create NAME --network NETWORK \
   [--region REGION]

$ gcloud compute forwarding-rules create VPN-esp [--region REGION] \
    --address SOURCE_ADDRESS --ip-protocol ESP \
    --target-vpn-gateway VPN

$ gcloud compute forwarding-rules create VPN-udp-500 [--region REGION] \
    --address SOURCE_ADDRESS --ip-protocol UDP --ports 500 \
    --target-vpn-gateway VPN

$ gcloud compute forwarding-rules create VPN-udp-4500 [--region REGION] \
    --address SOURCE_ADDRESS --ip-protocol UDP --ports 4500 \
    --target-vpn-gateway VPN

$ gcloud compute vpn-tunnels create NAME [--region REGION] \
    --peer-address TARGET_ADDRESS --ike-version 2 \
    --local-traffic-selector 0.0.0.0/0 --shared-secret SECRET \
    --target-vpn-gateway VPN

$ gcloud compute routes create NAME --network NETWORK \
    --next-hop-vpn-tunnel-region REGION --next-hop-vpn-tunnel VPN_TUNNEL \
    --destination-range RANGE
```

### Storage

#### Persistent disks

```shell-session
$ gcloud compute disks create NAME \
    [--image-project IMAGE_PROJECT --image IMAGE | \
    --source-snapshot SNAPSHOT] \
    [--region REGION --replica-zones ZONE,ZONE | --zone ZONE] \
    [--type pd-standard|pd-ssd] [--size SIZE] \
    [--description DESCRIPTION] [--labels KEY=VALUE]

$ gcloud compute disks resize DISK [--region REGION | --zone ZONE] --size SIZE

$ gcloud compute disks snapshot DISK [--region REGION | --zone ZONE] \
    [--snapshot-names NAME] [--description DESCRIPTION] [--labels KEY=VALUE]
```

#### Storage (GCS)

```shell-session
$ gsutil mb [-p PROJECT] [-c standard|nearline|coldline|archive] \
    [-l REGION|MULTI_REGION] [--retention TIME] [-b off|on] gs://NAME

$ gsutil ls [-dhlrR] [-abeL] [-p PROJECT] [PATH]

$ gsutil cp [-nprR] [-AemIv] [-a ACL] [-s CLASS] \
    [-j EXTENSION | -J] [-z EXTENSION | -Z] SRC DEST

$ gsutil rsync SRC DEST

$ gsutil rm OBJECT

$ gsutil acl ch [-mrR] \
    {-u ID|EMAIL:ROLE | \
    -g ID|EMAIL|DOMAIN|"AllAuth"|"All":ROLE | \
    -p {owners|editors|viewers}-PROJECT_NUMBER:ROLE | \
    -d ENTITY[:ROLE]} OBJECT

$ gsutil acl ch -d AllUsers PATH

$ gsutil rewrite [-s CLASS] OBJECT

$ gsutil defstorageclass set CLASS BUCKET

$ gsutil defacl ch ENTITY:ROLE

$ gsutil lifecycle set life.json gs://$BUCKET_NAME_1

https://cloud.google.com/storage/docs/lifecycle

{
  "rule": [
    {
      "action": {"type": "Delete"},
      "condition": {"age": 31}
    }
  ]
}

$ gsutil versioning set on BUCKET

$ gsutil web set [-m INDEX] [-e ERROR_PAGE] BUCKET



$ python3 -c 'import base64; import os; \
    print(base64.encodebytes(os.urandom(32)))'

$ gsutil config -n
$ vim .boto
```

#### Datastore

```shell-session
$ gcloud datastore indexes create PATH

$ gcloud datastore indexes cleanup PATH
```

#### Cloud SQL

```shell-session
$ gcloud sql instances list

$ gcloud sql instances clone SOURCE DESTINATION

$ gcloud sql instances create NAME [--region REGION] \
    [--authorized-networks NETWORKS] [--availability-type regional|zonal] \
    [--backup] [--backup-location LOCATION] [--backup-start-time] \
    [--database-version VERSION] [--database-flags FLAGS] \
    [--replication synchronous|asynchronous] \
    [--replica-type READ|FAILOVER | --master-instance-name MASTER_DB] \
    [--failover-replica-name NEW_REPLICA] \
    [--tier MACHINE_TYPE | --cpu MAX_CORES --memory MEMORY] \
    [--storage-size SIZE] [--storage-type SSD|HDD] \
    [--root-password PASSWORD]

$ gcloud sql instances restart NAME

$ gcloud sql users create NAME --instance INSTANCE [--password PASSWORD] \
    [--host IP|RANGE]

$ gcloud sql users set-password USER --instance INSTANCE --password PASSWORD

$ gcloud sql backups create --instance INSTANCE --description DESCRIPTION

$ gcloud sql backups restore ID --restore-instance INSTANCE

$ gcloud sql connect INSTANCE [--user USER] [--database DATABASE]
```

### Big Data

#### Pub/Sub

```shell-session
$ gcloud pubsub topics list \
    [--filter EXPRESSION] [--page-size SIZE] [--limit LIMIT] [--sort-by FIELD]

$ gcloud pubsub topics create NAME

$ gcloud pubsub topics list-subscriptions NAME \
    [--filter EXPRESSION] [--page-size SIZE] [--limit LIMIT] [--sort-by FIELD]

$ gcloud pubsub topics publish NAME --message DATA

$ gcloud pubsub topics delete NAME

$ gcloud pubsub subscriptions list \
    [--filter EXPRESSION] [--page-size SIZE] [--limit LIMIT] [--sort-by FIELD]

$ gcloud pubsub subscriptions create --topic TOPIC NAME \
    [--expiration-period EXPIRATION_PERIOD] [--retain-acked-messages] \
    [--message-retention-duration MESSAGE_RETENTION_DURATION]

$ gcloud pubsub subscriptions pull NAME [--auto-ack] \
    [--filter EXPRESSION] [--page-size SIZE] [--limit LIMIT] [--sort-by FIELD]

$ gcloud pubsub subscriptions delete NAME
```

#### BigQuery

```shell-session
$ bq
```

### Security

#### KMC

```shell-session
$ gcloud services enable cloudkms.googleapis.com

$ gcloud kms keyrings add-iam-policy-binding \
    --location REGION|global KEYRING \
    --member ACCOUNT --role roles/cloudkms.admin

$ gcloud kms keyrings add-iam-policy-binding \
    --location REGION|global KEYRING \
    --member ACCOUNT --role roles/cloudkms.cryptoKeyEncrypterDecrypter

$ gcloud kms keyrings create NAME --location REGION|global

$ gcloud kms keys create NAME --location REGION|global --keyring KEYRING \
    --purpose encryption|asymmetric-encryption|asymmetric-signing \
    [--labels KEY=VALUE]

$ gcloud kms encrypt --location REGION|global --keyring KEYRING --key KEY \
    --plaintext-file SOURCE --ciphertext-file DESTINATION

$ gcloud kms decrypt --location REGION|global --keyring KEYRING --key KEY \
    --ciphertext-file SOURCE --plaintext-file DESTINATION
```

#### CFT Scorecard

```shell-session
$ gcloud services enable cloudasset.googleapis.com

$ gcloud asset export {--organization | --folder | --project} VALUE \
    --output-path=PATH/resource_inventory.json --content-type=resource

$ gcloud asset export {--organization | --folder | --project} VALUE \
    --output-path=PATH/iam_inventory.json --content-type=iam-policy

$ git clone https://github.com/forseti-security/policy-library.git

$ cp policy-library/samples/storage_blacklist_public.yaml \
    policy-library/policies/constraints/

$ wget -O cft 'https://storage.googleapis.com/cft-cli/latest/cft-linux-amd64'

$ chmod +x cft

$ ./cft scorecard --policy-path=policy-library/ \
    {--bucket | --dir-path} VALUE
```

# Atribuciones

**Google Cloud Team.** *Google Cloud Training.* <https://google.qwiklabs.com>

