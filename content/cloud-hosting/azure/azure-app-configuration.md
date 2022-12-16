---
title: Azure App Configuration
showMetadata: true
editable: true
showToc: true
tocDepth: 3
order: 1
---

# What is Azure App Configuration?
- Azure App Configuration provides a service to centrally manage application settings and feature flags.

# Prerequisite
- Create an Azure Account
- Setup Azure CLI
- Log in with Azure CLI
- Create a resource group.
- To learn these steps, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).

# Create Azure App Configuration
- Example code to create free Azure App Configuration:
  ```sh
    $ az appconfig create \
      --resource-group codesanook-example-resource-group \
      --location southeastasia \
      --name codesanook-example-app-config \
      --sku Free
  ```

# List connection string
  ```sh
  $ az appconfig credential list \
    --resource-group codesanook-example-resource-group \
    --name codesanook-example-app-config
  ```

# Store JSON value in App Configuration
```sh
  $ az appconfig kv set \
    --connection-string 'Endpoint=https://codesanook-example-app-config.azconfig.io;Id=xxx;Secret=xxx' \
    --key TestApp:Settings:Colors \
    --value [\"red\", \"green\", \"blue\"] \
    --content-type application/json
  ```

# Consume configuration in .NET Generic host

## Setup a new .NET project and add required Nuget package
- Create a .NET Console app project with the following command:
  ```sh
  $ dotnet new console --name AzureAppConfigurationExample
  ```
- CD to `AzureAppConfigurationExample` folder and add required Nuget package with the following command:
  ```sh
  $ dotnet add package Microsoft.Extensions.Hosting
  $ dotnet add package Microsoft.Extensions.Configuration.AzureAppConfiguration
  ```

# Update code to consume Azure App Configuration
- Open the project with VS Code.
- Open `Program.cs` file and update the code as following:
  ```cs
  using Microsoft.Extensions.Configuration;
  using Microsoft.Extensions.DependencyInjection;
  using Microsoft.Extensions.Hosting;
  using Microsoft.Extensions.Options;

  // Create generic host builder
  var builder = Host.CreateDefaultBuilder(args);

  // Configure configuration source
  builder.ConfigureAppConfiguration(configurationBuilder =>
  {
      configurationBuilder.SetBasePath(Directory.GetCurrentDirectory());
      configurationBuilder.AddJsonFile("appsettings.json", optional: true);
      configurationBuilder.AddEnvironmentVariables();
      configurationBuilder.AddUserSecrets<Program>();

      // Configure Azure App Configuration. We need to build configuration to a get connection string from a user secret.
      var configuration = configurationBuilder.Build();
      configurationBuilder.AddAzureAppConfiguration(configuration.GetConnectionString("AppConfig"));
  });

  builder.ConfigureServices((hostContext, services) =>
      // Bind TestApp:Settings section to TestSettings class.
      services.Configure<TestSettings>(hostContext.Configuration.GetSection("TestApp:Settings"))
  );

  // Build a generic host.
  using var host = builder.Build();

  // Consume the configuration by creating a new solve and resolve dependency.
  // IOptions can be used as constructor injection
  using var scope = host.Services.CreateScope();
  var settings = scope.ServiceProvider.GetRequiredService<IOptions<TestSettings>>();
  Console.WriteLine($"{string.Join("\n", settings.Value.Colors)}");

  // Run a generic host.
  await host.RunAsync();

  // Settings class to hold setting values
  class TestSettings
  {
      public string[] Colors { get; set; }
  }
  ```

## Set user secret to the project
- Get connection string value from `az appconfig credential list` command.
  ```sh
  $ dotnet user-secrets init
  $ dotnet user-secrets set ConnectionStrings:AppConfig 'Endpoint=https://codesanook-example-app-config.azconfig.io;Id=xxx;Secret=xxx'
  ```
## Run .NET project
```sh
$ dotnet run
```
- You should see all values of colors setting in a terminal.

# Delete Azure App Configuration key
  ```sh
  $ az appconfig kv delete \
    --connection-string 'Endpoint=https://codesanook-example-app-config.azconfig.io;Id=xxx;Secret=xxx' \
    --key TestApp:Settings:Colors
  ```

# Delete Azure App Configuration
- Example code to delete Azure App Configuration:
```sh
  $ az appconfig delete \
    --resource-group codesanook-example-resource-group \
    --name codesanook-example-app-config
```

# Useful resources
- [Quick start: Create an ASP.NET Core app with Azure App Configuration](https://learn.microsoft.com/en-us/azure/azure-app-configuration/quickstart-aspnet-core-app?tabs=core6x)
- [Azure App Configuration CLI](https://learn.microsoft.com/en-us/cli/azure/appconfig?view=azure-cli-latest)
- [Using .NET Secret Manager with console applications](https://blog.xmi.fr/posts/dotnet-console-app-with-secrets/)
- [Avoiding Startup service injection in ASP.NET Core 3](https://andrewlock.net/avoiding-startup-service-injection-in-asp-net-core-3/)
- [Working with options and settings](https://learn.microsoft.com/en-us/azure/azure-functions/functions-dotnet-dependency-injection#working-with-options-and-settings)
- [Comparing WebApplicationBuilder to the Generic Host](https://andrewlock.net/exploring-dotnet-6-part-2-comparing-webapplicationbuilder-to-the-generic-host/)
- [Configuring named options using IConfigureNamedOptions and ConfigureAll](https://andrewlock.net/configuring-named-options-using-iconfigurenamedoptions-and-configureall/)
