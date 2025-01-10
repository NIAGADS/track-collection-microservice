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



## Docker builds

> NOTE: this template includes a docker-compose.yaml file.  README for building a templated docker application will be added soon.
