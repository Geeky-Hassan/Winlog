## How to get started

1. Clone this project
```bash
git clone repo_url
```
2. Delete the file __pnpm-lock.yaml__
3. Open 2 terminals:

    1. 1st at the path of project (__hassan/BragDoc-Project__)
    2. 2nd at the path of api (__hassan/BragDoc-Project/src/api__)

4. At the path of the project (terminal), run this command:
```bash
pnpm install
# or if you have npm then,
npm install
```
5. After installed, run this command:
```bash
pnpm start
#or if with npm
npm start
```
6. At the api terminal, create a venv:
```bash
# either using uv or pip whatever you prefer
# and then activate it
```
7. Run the command:
```bash
# with uv
uv pip install -r requirements.txt

# without uv
pip install -r requirements.txt
```

8. Start the server with,
```bash
py server.py
```