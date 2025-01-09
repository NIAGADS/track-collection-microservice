# nextjs-template

> template repository for NIAGADS next.js sites

## Usage


```bash
npx create-next-app --example https://github.com/NIAGADS/nextjs-template <app>
```

## To sync templated projects with the template

* in the local project directory for the application built from the template

```bash
git remote add template https://github.com/NIAGADS/nextjs-template
git fetch --all
git merge template/[branch to merge] --allow-unrelated-histories
```
