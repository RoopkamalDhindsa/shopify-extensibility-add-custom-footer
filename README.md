# Shopify extensibility custom footer checkout App Template - Remix

This is a template for building a [Shopify app](https://shopify.dev/docs/apps/getting-started) using the [Remix](https://remix.run) framework.

<!-- TODO: Uncomment this after we've started using the template in the CLI -->
<!-- Rather than cloning this repo, you can use your preferred package manager and the Shopify CLI with [these steps](#installing-the-template). -->

## Step 1: Setup Shopify app and install it on dev store

### Prerequisites

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
2. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
3. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

<!-- TODO Make this section about using @shopify/app once it's added to the CLI. -->

### Setup

If you used the CLI to create the template, you can skip this section.

1. Run the below command to install the node module.

```shell
npm install
```

2. If you received an error about fixing the npm audit then run the below commands as required:

```shell
npm audit fix
```
OR

```shell
npm audit fix --force
```


### Make sure you are your CLI version is 3.5 or higher

1. check shopify CLI version

```shell
npm run shopify version
```

2. Run below command to update CLI version run

```shell
npm run shopify upgrade
```

### Local Development

```shell
npm run shopify app dev
```

This setup will take you through creating a new Shopify App. You must be logged in to your partner account before starting this command. Enter name for your app and proceed next until it shows app preview link and graph QL link. 


## Step 2: Retrieve the store's published checkout profile ID

### 1. Query `checkoutProfiles` to retrieve a list of checkout profile IDs.
The `is_published` parameter indicates which checkout profile is currently applied to your store's live checkout.

Open the graph QL link of app from the terminals of VS Studio and run this below and run below query in GrphQL editor.

```shell
query checkoutProfiles {
  checkoutProfiles(first: 1, query: "is_published:true") {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

### 2. Make note of your corresponding ID from the list. You'll supply the ID in subsequent mutations.


## Step 3: Hide the default footer policy links and make the footer full width

To replace the default footer with customized content, you first need to hide it. After the default is hidden, you can use a checkout UI extension to add the custom footer.

Make a request to the checkoutBrandingUpsert mutation's customizations object. You'll hide the default footer, and expand the footer to full width so that your extensions can render across the entire page.

### 1. Add below to GraphQL mutation

```shell
mutation updateCheckoutBranding($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId:ID!) {
  checkoutBrandingUpsert(checkoutBrandingInput:$checkoutBrandingInput, checkoutProfileId:$checkoutProfileId) {
    checkoutBranding {
      customizations {
        footer {
          content {
            visibility
          }
          position
        }
      }
    }
  }
}
```

### 2. Add below to GraphQL query variables. 
Make sure to replace the `YOUR_CHECKOUT_PROFILE_ID_HERE` with the ID you received in previous step.

```shell
{
  "checkoutProfileId": "gid://shopify/CheckoutProfile/YOUR_CHECKOUT_PROFILE_ID_HERE",
  "checkoutBrandingInput": {
    "customizations": {
      "footer": {
        "content": {
          "visibility": "HIDDEN"
        },
        "position": "END"
      }
    }
  }
}
```

If you are receiving an error about access denied then you may have to update the access scope for the app in the `app's toml file`.

=> step 1: 

press ctrl +C to stop app dev environment

=> step 2:

open file named `shopify.app.YOUR-APP-NAME.toml`.

update the access scope with `read_checkout_branding_settings,write_checkout_branding_settings`. It will be like `scopes = "read_checkout_branding_settings,write_checkout_branding_settings"`.

```shell
scopes = "read_checkout_branding_settings,write_checkout_branding_settings"
```

=> step 3: 

un-install the app from dev store.


=> step 4: 

run below to release new version of app and update access scope of app


=> step 5: 

again run below:

```shell
npm run shopify app dev
```

this will allow you to install the app again.




## Step 3: Deploy the app.

Press Ctrl+C to stop the app development environment and then, run below in terminals to deploy your app.

```shell
npm run shopify app deploy
```

## Step 4: Edit Footer data.

By default it will add some links and data to footer. 
You can change by editing the file `/extensions/custom-footer/src/Extension.jsx`.
