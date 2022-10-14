echo "nginx-config.sh"

###########
#
# This script is not yet automatic.
# Execute steps manually.
#
###########

# disable server token that exposes nginx version
sudo vi /etc/nginx/nginx.conf
#> change: server_tokens off

# remove default sites enabled
sudo unlink /etc/nginx/sites-enabled/default

# TODO do not override after running certbot because certbot changes this configuration
sudo touch /etc/nginx/sites-available/api.impromat.marcoklein.dev
echo 'server {
    listen 80;
    server_name api.impromat.marcoklein.dev;
    access_log /var/log/nginx/api.impromat.marcoklein.dev.log;

    location / {
        proxy_cookie_domain localhost api.impromat.marcoklein.dev;
        proxy_cookie_path / "/; secure"; # set cookie to secure because it needs HTTPS which is available after the proxy
        proxy_pass http://localhost:8080;
    }
}
' | sudo tee /etc/nginx/sites-available/api.impromat.marcoklein.dev

# symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/api.impromat.marcoklein.dev \
           /etc/nginx/sites-enabled/api.impromat.marcoklein.dev

# test there are no config issues
sudo nginx -t
sudo systemctl reload nginx

# add HTTPS
sudo certbot --nginx