

export const DateFormat: Object = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}  

export type kubeImage = {
    name: string 
    uri: string
}

interface ResourceObject {
    [key: string]: string; // Assuming all fields are of string type
  }

export const resourceTranslationMap:ResourceObject = {
    deployment: 'deploy',
    service: 'svc',
    pod: 'po',
    replicationcontroller: 'rc',
    namespace: 'ns',
    job: 'job',
    daemonset: 'ds',
    statefulset: 'sts',
    persistentvolume: 'pv',
    persistentvolumeclaim: 'pvc',
    configmap: 'cm',
    secret: 'secret',
    ingress: 'ing',
    serviceaccount: 'sa',  
    cronjob: 'cronjob',
    endpoint: 'ep',
    limitrange: 'limits',
    node: 'node',
    storageclass: 'sc',
    customresourcedefinition: 'crd',
    horizontalpodautoscaler: 'hpa',
    networkpolicy: 'netpol',
    role: 'role',
    rolebinding: 'rb',
    clusterrole: 'c-role',
    clusterrolebinding: 'crb',
    // Add more translations as needed
  };