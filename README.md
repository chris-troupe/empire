# Empire Game Website

A simple two-page website for managing names in the Empire game.

## Features

- **Public Page** (`/`): Anyone can add names and view all current names
- **Admin Page** (`/admin.html`): Edit and delete names

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Access:
   - Public page: http://localhost:3000
   - Admin page: http://localhost:3000/admin.html

## AWS Deployment

### Option 1: EC2 Instance

1. **Launch an EC2 instance:**
   - Choose Ubuntu or Amazon Linux
   - Configure security group to allow inbound traffic on port 3000 (or your chosen port)
   - Save your key pair

2. **SSH into your instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Node.js:**
```bash
# For Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or for Amazon Linux
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

4. **Clone or upload your project:**
```bash
# Option A: Clone from git
git clone <your-repo-url>
cd empire2

# Option B: Upload via SCP (from your local machine)
# scp -i your-key.pem -r /Users/ctroupe/Projects/empire2 ubuntu@your-ec2-ip:~/
```

5. **Install dependencies:**
```bash
npm install
```

6. **Run the server:**
```bash
# For testing
npm start

# For production (using PM2 - recommended)
npm install -g pm2
pm2 start server.js --name empire
pm2 save
pm2 startup  # Follow the instructions to set up auto-start
```

7. **Access your site:**
   - Get your EC2 public IP from the AWS console
   - Visit: http://YOUR_EC2_IP:3000
   - Admin: http://YOUR_EC2_IP:3000/admin.html

### Option 2: Elastic Beanstalk

1. Install EB CLI:
```bash
pip install awsebcli
```

2. Initialize EB:
```bash
eb init
```

3. Create and deploy:
```bash
eb create
eb open
```

## Security Notes

- The admin page is currently open to anyone who knows the URL. Consider adding authentication.
- Data is stored in-memory and will be lost on server restart. For persistent storage, consider adding a database.
- For production, consider using HTTPS and setting up a reverse proxy (nginx) in front of Express.

## Customization

- Change port: Set `PORT` environment variable or modify `server.js`
- Add authentication: Implement middleware for `/admin.html` routes
- Persistent storage: Replace in-memory array with a database (MongoDB, PostgreSQL, etc.)

