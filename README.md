# nextjs-template

> template repository for NIAGADS next.js sites

## Create new projects

### Create a new next.js application from the template 

(new application; not a GitHub repository)

```bash
npx create-next-app --example https://github.com/NIAGADS/nextjs-template <app>
```

### Generate a new repository in GitHub using the template 

#### CLI

```bash
gh repo create <new-repo-name> --template="https://github.com/NIAGADS/nextjs-template"
```

#### Using GitHub.com interface

<https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template>

## Sync templated projects

To keep applications generated from the template, run the following in the application's local project directory:

```bash
git remote add template https://github.com/NIAGADS/nextjs-template
git fetch --all
git merge template/[branch to merge] --allow-unrelated-histories
```

and merge conflicts as required for your application.

## Customize

For each of the following files, please adjust as appropriate for your project:

### package.json

* `name`
* `bugs->tracker` to be `https://github.com/<your_project>/issues`
* `bugs->email` to be `help@niagads.org` when in **production**
* `author` (add e-mails and URLs as necessary)
* `contributors` (add e-mails and URLs as necessary)

### next-seo.config.js

* all occurrences of `title`, `titleTemplate`, `defaultTitle`, `description`
* in production: `url`, `canonical`

For more information on search engine optimization (SEO), please visit:

* <https://nextjs.org/learn-pages-router/seo/introduction-to-seo>
* <https://github.com/garmeeh/next-seo>
* <https://blog.logrocket.com/manage-seo-next-js-with-next-seo/>

### docker-compose.yaml

* change `service->name` from `nextjs-template-app` as appropriate

You may also need to customize the `networks` section if your application needs to share a network w/other dockerized services. 

See the [docker-compose.yaml](https://github.com/NIAGADS/niagads-api-client/blob/244ac6f080e760f45ae7f2e60143daa839e10e45/docker-compose.yaml) from the NIAGADS API Client for an example.

### app/layout.tsx

* exported `Metadata` object

### tsconfig.json and tsconfig.base.json

Next.js overwrites `tsconfig.json` under certain conditions if values don't meet its expected defaults.  This is a problem for development and for handling older third-party libraries.  As a work-around, `tsconfig.base.json` has been added and `tsconfig.json` modifid to `extend` the `tsconfig.base.json` configuration.

> Customizations to the `tsconfig` should be made to the `.base.json` file.

## Deployment

This is just a basic next.js application, so follow standard procedure.

In the project directory: 
* `npm run build` generates optimized version for production w/stricter linting
* `npm run dev` runs a development build, generated with turbopack
* `npm run start` or `npm run prod` runs the production build
* `npm run lint` to lint the code

### Docker

This template includes a docker-compose.yaml file. The docker build is 2-stage that creates a slim runner application linked to code on the host.  This allows easy editing of the code w/hot-reloads in development environments.  

A Docker deployment requires several environmental variables to be set in an `.env` file.  Copy the sample file:

```bash
cp docker.env.sample .env
```

and edit the following variables as appropriate:

* properties for naming the container and image:
  * `VERSION`
  * `CONTAINER_NAME`
* `BUILD` set to `prod` or `dev` 
* `NETWORK` name of the docker network for the application
* `PORT` mapped port on the host
* `GIT_DEPENDENCIES` set to `1` if your `package.json` imports packages from GitHub
* `APPLICATION_DIR` full path to the application root directory on the host; e.g. `/projects/nextjs-template`

Make sure there is a placeholder `.env.local` file if not required by your application:

```bash
cp sample.env.local .env.local
```

> *IMPORTANT*: the docker build requires the `.env.local` environmental file for the `next.js` application.  If your application does not require any environmental settings you must create the placeholder file.  

To deploy, run the following:

```bash
docker-compose up -d
```

