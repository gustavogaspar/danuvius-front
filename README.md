# Getting Started with Danuvius Front End

On the folder src/data change the file APIPaths.json to your environment configuration.

### Deployment

* Local Machine:
copy this repo to a Oracle Linux instance, and run the script install.sh to create deploy in your local machine (CENTOS ONLY)

* Docker:
 1. Copy this repo to your docker server, navigate to the project folder and run the following command: ```  docker build -t danuvius-front  ```
 2. [OPTIONAL] You can test by running: ```docker run -p 5000:5000 -d danuvius-front``` be sure there is nothing running on port 5000 of your server.

 * Kubernetes:
 1. Execute the required docker steps.
 2. Go to the manifests folder, and edit the following information in ``` danuvius.yaml ``` file to represent your environment:
    - image: Your image/ image repo. [IMPORTANT] If you are using Oracle Cloud infrastructure Registry you can use this guide to push your image to your registry environment: [Pushing Images Using the Docker CLI](https://docs.cloud.oracle.com/en-us/iaas/Content/Registry/Tasks/registrypushingimagesusingthedockercli.htm)

    - secret: Your docker repo secret.[IMPORTANT] If you are using Oracle Cloud infrastructure Registry its mandatory that you have one secret configured in your cluster, please refer to: [Pulling Images from Registry during Kubernetes Deployment](https://docs.cloud.oracle.com/en-us/iaas/Content/Registry/Tasks/registrypullingimagesfromocir.htm)

    - service/type: You can choose whether you want to use "NodePort" or "LoadBalancer" service type to expose your deployment.To know the difference between than, you can access [HERE](https://kubernetes.io/docs/concepts/services-networking/service/)

 3. With kubectl installed and configured to your kubernetes cluster navigate to the manifests folder and run ``` kubectl apply -f danuvius.yaml ```. Check how you can configure your own kubernetes cluster on oracle cloud: [Creating a Kubernetes Cluster](https://docs.cloud.oracle.com/en-us/iaas/Content/ContEng/Tasks/contengcreatingclusterusingoke.htm) and also you can configure your access to your cluster by following this guide [Setting Up Cluster Access](https://docs.cloud.oracle.com/en-us/iaas/Content/ContEng/Tasks/contengdownloadkubeconfigfile.htm)


 _Have Fun_






