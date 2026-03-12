---
layout: post
title: "Client certificates in ASP.NET"
date: 2024-06-16
categories: [Programming]
image: /assets/images/2024/06/client-certificate-blog.jpg
tags: [api, asp.net, client certificates, security]
---

Authentication is often a broad, difficult and not straightforward topic to work on as a software engineer. There are endless options to secure your application and just as many ways to implement each option. And once your team has it all worked out, the business wants to onboard a new client that doesn't want to or cannot follow the previously built secure route. Just as with functional requirements, security requirements are rarely static or require continuous maintenance and upgrading.

![Featured image for 2024-06-16-client-certificates-in-asp-net]({{ '/assets/images/2024/06/client-certificate-blog.jpg' | relative_url }})

One aspect of security which I find interesting is Client Certificate Authentication. It may sound a bit old school to send along a certificate with your request, with the JWT authentication methods that are in fashion for the past years. However, I think it still has a valuable purpose to fulfill.

## What is Client Certificate Authentication?

When you navigate to a public website for example through your browser, the server of that website will present itself and show an SSL certificate to let you know that further traffic should be encrypted using this method. Your computer will check if the presented certificate is trusted directly and indirectly through a certificate authority. The client is in the end in control whether or not this website is to be trusted. The server, however, doesn't have that same luxury, it has to accept every client that calls it. And often, that is fine. For public websites or applications the server doesn't need to be picky about which clients to accept or not. Everyone is welcome to visit.

But in other scenarios it might be wise to add this mutual trust between client and server. When a back-end system is calling another back-end system for example. The server will now also request the client to present some sort of identification, a certificate for example.

## Challenges with Client Certificates

### Certificate rotation

Is still something most organizations don't excel in. Although automation is possible in most circumstances, you are dependent on the client organization to time the rotation properly.

### Certificate storage

Similar to the previous point, the client is responsible for securely storing the certificate and using the correct tooling to send it along with the requests. Mistakes or shortcuts can compromise the security.

### Cost

Generating, rotating and distributing certificates signed by a root certificate authority for example, is a costly business. Depending on the organization size, this might already be in place.

## Securing your API with Client Certificates

I'll use the default ASP.NET API example as a base. It has no authentication by default so I can add the required components step by step. We'll start off with the easy steps and then go deeper in the more complex and less intuitive adjustments. For the full working example, see the [Git repository](https://github.com/wouterfennis/blogExamples/tree/main/ClientCertificates).

### Controller

On the controller which we want to secure we need to add one attribute to trigger the certificate authentication steps as soon as a request arrives. I explicitly fill an authentication scheme property to reference to this mechanic:

```csharp
[ApiController]
[Route("[controller]")]
// The line below will require a client certificate to be presented when calling the WeatherForecast endpoint.
[Authorize(AuthenticationSchemes = CertificateAuthenticationDefaults.AuthenticationScheme)]
public class WeatherForecastController : ControllerBase
```

### Startup

The next steps depend on the hosting model your API is running on. In an Azure App Service for example, the certificate is intercepted before it reaches the API and forwarded through a header. I'll mark the steps that are required for certificate forwarding through headers and direct certificate handover.

#### Extra steps required for certificate forwarding

Certificate exchanges happen at a transport layer level. So we need to configure the kestrel server to request client certificates on incoming requests:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // 1. Request client certificates and require them for all requests
        builder.Services.Configure<KestrelServerOptions>(options =>
        {
            options.ConfigureHttpsDefaults(options =>
            {
                options.ClientCertificateMode = ClientCertificateMode.RequireCertificate;
            });
        });
```

We need to make sure that request headers are forwarded to your startup logic. With the following block this can be achieved:

```csharp
        // 2
        builder.Services.Configure<ForwardedHeadersOptions>(options =>
        {
            // This will forward the X-Forwarded-For and X-Forwarded-Proto headers
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;

            // This will forward the X-Forwarded-Host header
            options.KnownNetworks.Clear();

            // This will forward the X-Forwarded-Host header
            options.KnownProxies.Clear();
        });
```

If the certificate is put forward through a header it needs to be translated back to a certificate instance. With the following block the header key can be overwritten and the header value can be converted to a X509 certificate:

```csharp
        // 3
        builder.Services.AddCertificateForwarding(options =>
        {
            //options.CertificateHeader = "X-ARR-ClientCert"; // This is standard with App Services
            options.HeaderConverter = (headerValue) =>
            {
                if (string.IsNullOrEmpty(headerValue))
                {
                    return null;
                }

                var bytes = Convert.FromBase64String(headerValue);
                return new X509Certificate2(bytes);
            };
        });
```

#### Certificate validation

The following block will demonstrate how an incoming certificate can be validated. This is the very basic setup as more settings can be tweaked.

Important highlight is the `CertificateAuthenticationEvents` that is being overwritten to implement a check where the thumbprint of the incoming certificate must match an expected value. Here only `OnCertificateValidated` is being filled in, this is being called after the certificate has been checked for basic validity such as certificate type and expiration.

Notice that if the certificate is valid, we can construct a `ClaimsPrincipal` which you can provide claims or scopes. More fine grained authorization can still be configured this way for specific API operations:

```csharp
        // 4
        builder.Services
            .AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme)
            .AddCertificate(options =>
            {
                options.AllowedCertificateTypes = CertificateTypes.All; // This is just for demo purposes. Normally a real application should check chained certificates.
                options.RevocationMode = X509RevocationMode.NoCheck; // This is just for demo purposes. Normally a real application should check revocation.
                options.ValidateCertificateUse = true; // This is normally already true by default
                options.ValidateValidityPeriod = true; // This is normally already true by default
                options.Events = new CertificateAuthenticationEvents
                {
                    OnCertificateValidated = context =>
                    {
                        var isValid = configuration["TrustedThumbprint"]!.Equals(context.ClientCertificate.Thumbprint, StringComparison.OrdinalIgnoreCase);

                        if (isValid)
                        {
                            context.Principal = new ClaimsPrincipal(new ClaimsIdentity("TheCertificateUser"));
                            context.Success();
                        }
                        else
                        {
                            context.Fail("Invalid certificate");
                            Console.WriteLine("Invalid certificate");
                        }

                        return Task.CompletedTask;
                    }
                };
            });
```

To have all this wired up some middleware has to be put in place for both the header and certificate forwarding:

```csharp
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // 5
        // Forwarded headers and certificate forwarding are required for running behind a reverse proxy
        // This will make the client certificate available to the application
        app.UseForwardedHeaders();
        app.UseCertificateForwarding();
```

From a code perspective, everything is now in place. But to try this out we need to have an actual certificate to work with. I've written a PowerShell script to generate a self-signed root certificate and use it to sign a client certificate accordingly.

In a production scenario, you should use an actual certificate authority to sign your client certificates.

After the certificate has been generated we can extract the thumbprint and configure it in the App settings of the API for later comparison. The self-signed root and client certificate are loaded into the keystore of your windows machine.

If we start up the API it will open the browser and, depending on your browser, a prompt will show asking for a Client Certificate to send along to the local running server. This is the first sign that our adjustment of the Kestrel server is actually working.

![Select certificate]({{ '/assets/images/2024/06/client-certificate-blog.png' | relative_url }})

The browser will look into your personal certificate store to see if there are any certificates suitable for client authentication. Because the PowerShell script has already loaded it in, you're able to select it. Making API calls from this point onwards will succeed because the browser will make sure the certificate is passed along.

![200 response]({{ '/assets/images/2024/06/image-3.png' | relative_url }})

If you would not select the certificate and go in without any, the request will be blocked as expected.

![403 response]({{ '/assets/images/2024/06/image-2.png' | relative_url }})

## Conclusion

Client certificates can provide additional security between client and server. Especially when a back-end system is calling another back-end system, this mechanism can perfectly fit in your security architecture. I would not recommend it when the number of clients and potentially the manual maintenance is taking too much of your operations capacity.

If you do plan to implement it in ASP.NET, it is at least simple to configure and well enough documented at Microsoft to find more details about specific implementations. It is also an industry standard for years, so both client and server libraries and frameworks will have to provide support when targeting enterprise companies.

## References

- [GitHub example repository](https://github.com/wouterfennis/blogExamples/tree/main/ClientCertificates)
- [Configure certificate authentication in ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/security/authentication/certauth?view=aspnetcore-8.0)
