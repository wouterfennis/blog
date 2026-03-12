---
layout: post
title: "Bicep and environment specific requirements"
date: 2023-05-21
categories: [CI CD]
image: /assets/images/2023/05/bicep.png
tags: [bicep, environments, json]
---

Infrastructure as code, the eternal promise of stability, shared understanding and high maintainability. Often it starts out that way. You start writing the first components, tie them together in a procedure. It runs excellently in the development environment. Just one click away from rolling it out in other environments. But then you realize you can't.

![Featured image for 2023-05-21-bicep-and-environment-specific-requirements]({{ '/assets/images/2023/05/bicep.png' | relative_url }})

You have to restrict access way more on production, and you forgot to turn on the back-up strategy that isn't needed on dev. Did I tell you the landscape in production has to be zone redundant as well?

And so the conditional logic seeps in like water through a leaky roof. Parameters start popping up everywhere in your neatly separated bicep files. From module to module, flags and enums have to be passed along for a suddenly important piece of production configuration three levels down. Shamefully you have to explain to your team member the end result contains not so loosely coupled modules. So what goes wrong here?

## Infrastructure is never the same

The first problem is ignoring the fact that infrastructure as code rarely applies the exact same blueprint on all environments. There are always exceptions. Sometimes because of security measures or compliance, but also the cost perspective plays an important role. A development environment doesn't have to be zone redundant or have geo-redundant backups. So why pretend that there is uniformity?

## Introducing environment stage variables

A solution that I find fitting is introducing environment stage variables as I call it. This pattern extracts all differences between environments into one hardcoded JSON file. Each environment has to be mentioned in the file, declaring what the requirement is for back-up strategy, zone redundancy etc…

```json
{
  "StorageAccount": {
    "Sku": {
      "development": "Standard_LRS",
      "test": "Standard_LRS",
      "acceptance": "Standard_GZRS",
      "production": "Standard_GZRS"
    }
  },
  "ZoneRedundant": {
    "development": false,
    "test": false,
    "acceptance": true,
    "production": true
  }
}
```

These requirements or declarations are known long before each of the environments is created, they often come from non-functional requirements already agreed upon in the company. They will also not change during the rollout, for that reason. Making it less applicable for parameters in my opinion.

The next step is making use of these settings during the execution of Bicep. To prevent passing along this information through parameters from module to module, we load these settings wherever they are needed.

```bicep
@allowed([
  'development'
  'test'
  'acceptance'
  'production'
])
param releaseStage string

var releaseStageVariables = loadJsonContent('releaseStage.json')
```

Finally we insert the values directly at the resources upon creation. Using just one parameter to indicate which environment is currently being rolled out.

```bicep
resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: 'storage'
  kind: 'StorageV2'
  sku: {
    name: releaseStageVariables.StorageAccount.Sku[releaseStage]
  }
}
```

Whenever an environment is added where different rules apply the JSON file needs to be extended to cover all previously added settings. A great reminder to let the developer answer important non-functional questions on availability and recoverability for the new environment.

## Conclusion

Using this technique we were able to cut out a lot of parameters of each module in our project. They are still there of course in a way, only now the information can be read directly from the low level modules.

## References

- [Bicep functions – files – Azure Resource Manager](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-functions-files#loadjsoncontent)
