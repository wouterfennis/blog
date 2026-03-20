---
layout: post
title: "Distributing your API definition as a NuGet client"
description: "How to serialize an ASP.NET API definition with Swagger, generate a C# client with NSwag, and distribute it as a NuGet package."
date: 2024-03-09
categories: [Programming]
image: /assets/images/2024/03/distributingAPIs-Klein.jpg
tags: [.net, api, asp.net, c#, client, distributing, nswag, nuget, openapi, swagger]
---

Creating APIs is quite simple nowadays. You can have a functional API up and running in the Azure cloud within minutes. By using an OpenAPI library like Swagger to publish your API's definition, other systems can easily integrate and utilize its functionality. The real challenge, as with many programming aspects, lies in maintaining the software once other parties start using your API. To help your customers integrate with your API, but also to have some influence over the way the API is called, a client can be created on the maintainer side and distributed using a NuGet package.

![Featured image for 2024-03-09-distributing-your-api-definition-as-a-nuget-client]({{ '/assets/images/2024/03/distributingAPIs-Klein.jpg' | relative_url }})

## Designing the distribution

In this article I won't explore all possible options to serialize and distribute an API definition. There are, however, three stages that I will touch on:

1. Serializing the API definition, using Swagger
2. Generating a client, using NSwag
3. Distributing the client, using NuGet

## Swagger

Swagger is a powerful library when it comes to designing and distributing an API for different potential systems. It can be used to generate or design OpenApi definitions from the ground up. Even if you already have an existing API built in ASP.NET for example it can still be used to generate an OpenAPI definition, even if it doesn't uphold all the design conventions.

By attaching the Swagger NuGet package and making use of a few Attributes a so-called `swagger.json` file can be generated at compilation time. Distributing this file by hosting it close to your API or indirectly offline can help a third party implement the interface in minutes.

## NSwag

NSwag is the counterpart of the Swagger library. It can be used to generate code from an OpenApi definition. This library is typically used by a consumer of an API. Code that makes HTTP calls and processes the response is in most situations just a boilerplate implementation that works the same for any system. Only the programming language itself might have its specific quirks, but often a **language-specific** code generator exists for OpenAPI definitions.

NSwag is a .NET specific library used in these situations. It can generate a C# class that uses an HTTP Client for the specific endpoints and can supply an interface that can be used in an infrastructure layer of your software, it won't limit you from applying patterns like Dependency Injection to swap it with a Mock during testing.

As an API publisher there is a choice of leaving this step up to the consumers or by generating these files beforehand. By generating clients and distributing them pro-actively it can be seen as some sort of service for your consumers, but it can also give a hook to make sure that clients calling your API uphold some non-functional requirement. API consumers won't have the inside knowledge you might have as the maintainer. Every detail left out, will probably come back as a support ticket in your team.

Documenting your API is always a good practice, but won't guarantee that consumers will use your API as expected. For example, imagine the API is secured with OAuth 2.0 or [MTLS](/2024/06/16/client-certificates-in-asp-net/). You might want to prepare the HTTP Client to make sure it always authenticates the HTTP calls. The consumer only has to point to the specific credentials or certificate. Dependency Injection can also be prepared with an extension method.

## NuGet package

Generating or writing a client for your consumers beforehand can be a good practice. But just as with distributing a library or your API directly, a versioning strategy is required. Once a client has been distributed, it can take a consumer months or years to upgrade the client. It might even never happen depending on the kind of audience your API is consumed by.

## Example

### Simple API

For this example, I'm creating a simple ASP.NET Controller with basic functionality. It receives some input and returns an object back. For the full code example go to: [wouterfennis/blogExamples](https://github.com/wouterfennis/blogExamples)

Besides the API project I'm putting the client logic in a separate class library project. I'm acting like I'm already an external developer trying to look at the API from the outside, without referencing internal logic or models.

### Adding the swashbuckle.aspnetcore.cli

To generate OpenApi specifications at compile time, we need generation tooling to be available within the project. Swashbuckle has made its generation tooling [available](https://github.com/domaindrivendev/Swashbuckle.AspNetCore) as a dotnet tool and can be executed as a build step of your API.

```bash
dotnet tool install swashbuckle.aspnetcore.cli
```

To create a Swagger definition every time the software is built I've added the following section in the CSProj of the API project:

```xml
<PropertyGroup>
  <RunPostBuildEvent>OnBuildSuccess</RunPostBuildEvent>
</PropertyGroup>

<Target Name="PostBuild" AfterTargets="PostBuildEvent">
  <Exec Command="dotnet tool restore" />
  <Exec Command="dotnet swagger tofile --output $(ProjectDir)../Client/swagger.json $(ProjectDir)$(OutputPath)$(AssemblyName).dll v1" EnvironmentVariables="ASPNETCORE_ENVIRONMENT=Development" />
</Target>
```

First the swagger tooling is restored when this project is built for the first time. Then a `swagger.json` file is generated and placed in the Client project, as that is the place for further distribution.

![Solution view with swagger.json visible in Client project](/assets/images/2024/03/image.png)

### Generating the CSharp Client

Here we will use NSwag to generate a C# class from the previously generated `swagger.json`. Specifically, the `NSwag.ApiDescription.Client` will do the job for us in the Client project.

```bash
dotnet add package NSwag.ApiDescription.Client
```

With the library installed it can also be executed when the Client project is being compiled:

```xml
<ItemGroup>
  <OpenApiReference Include="swagger.json" CodeGenerator="NSwagCSharp" Namespace="Client" ClassName="Client">
    <Options>/UseBaseUrl:false /GenerateClientInterfaces:true </Options>
  </OpenApiReference>
</ItemGroup>
```

Notice how the `OpenApiReference` assumes the `swagger.json` is already present in the Client project. Build order has become important at this stage. Make sure that the projects are always built in the order that the Clients are last in line.

When the solution is built, you should see no compilation errors. However, no C# client is popping up in the IDE. That is because it is placed in the output directory of the build, it shouldn't be manually adjusted as it is generated code.

If you want to change configuration however, there are hooks to change the default generated behavior of the client. By introducing a partial class, sections can be overwritten:

```csharp
namespace Client
{
    public partial class Client
    {
        // Place to override default client settings.
    }
}
```

By adding an extension method to register the client in dependency injection we can give the consumer a handle to override the base address for example:

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace Client.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddApiClient(this IServiceCollection services, Uri baseUrl)
        {
            services.AddHttpClient<IClient, Client>(HttpClient => HttpClient.BaseAddress = baseUrl);
            return services;
        }
    }
}
```

To make the prepared client available through NuGet we need to declare this in the CSProj file:

```xml
<PropertyGroup>
  <TargetFramework>net6.0</TargetFramework>
  <ImplicitUsings>enable</ImplicitUsings>
  <Nullable>enable</Nullable>
  <AssemblyName>Client</AssemblyName>
  <RootNamespace>Client</RootNamespace>
  <PackageId>Client</PackageId>
  <Description>Client NuGet package</Description>
  <IsPackable>true</IsPackable>
  <GenerateDocumentationFile>True</GenerateDocumentationFile>
  <VersionPrefix>1.0.0</VersionPrefix>
</PropertyGroup>
```

Distributing this package using your feed by choice gives the consumer of your API the ability to setup the client with just one line of code:

```csharp
var apiBaseUri = new Uri("https://yourApiLocation");

// ...

services.AddApiClient(apiBaseUri);
```

## Conclusion

With this setup as your distribution model you can still work on your API as usual, but now you can version a client with semantic versioning alongside it. Consumers only have to update the package to make use of the latest definition, this makes the hurdle of updating quicker.

## References

- [Swashbuckle.AspNetCore](https://github.com/domaindrivendev/Swashbuckle.AspNetCore)
- [wouterfennis/blogExamples](https://github.com/wouterfennis/blogExamples)
