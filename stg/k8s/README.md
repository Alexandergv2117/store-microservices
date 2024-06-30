## Config ingress controller

### Install ingress-nginx
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

### Check ingress-nginx
```bash
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
```

### Recreate all pods
```bash	
helm upgrade store . --recreate-pods 
```

### Recreate specific pods of a deployment
```bash
helm upgrade store . --set store.service.auth.redeployTimestamp=$(date +%s)
```