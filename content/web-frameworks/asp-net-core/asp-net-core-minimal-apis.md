---
title: ASP.NET Core minimal APIs
showMetadata: true
editable: true
---

# A single file ASP.NET Core minimal APIs

# Install .NET 6 preview on WSL2 Ubuntu

## Fix Snap on WSL2
- Enable systemd on WSL2 by running the following commands:
```sh
$ cd ~
$ git clone https://github.com/DamionGans/ubuntu-wsl2-systemd-script.git
$ cd ubuntu-wsl2-systemd-script/
$ bash ubuntu-wsl2-systemd-script.sh
# Enter your password and wait until the script has finished
```
- Restart WSL2 by opening a new PowerShell session and run `wsl --shutdown`.
- Open a new WSL2 shell and run:
```sh
$ systemctl --version
```
- Your should find a version number `systemd 237` or a newer version of systemd.
- Unmask the snapd.service and restart it with the following command:
```sh
$ sudo systemctl unmask snapd.service
$ sudo systemctl enable snapd.service
$ sudo systemctl start snapd.service
```
- Now you can use Snap command on WSL2.


## Install .NET 6 preview with Snap
- Run the following command to install the latest .NET Core SDK:
```sh
$ sudo snap install dotnet-sdk --channel=6.0/beta --classic
```
- Wait several minutes until installation has finished.
- The default .NET Core command is `dotnet-sdk.dotnet` to not conflict with a globally installed .NET Core version you may have.
- Optionally, you can set an alias to `dotnet` with `sudo snap alias dotnet-sdk.dotnet dotnet` and remove with `sudo snap unalias dotnet`.
- Run `dotnet-sdk.dotnet --version`, you should find `6.0.100-preview.5.21302.13` or a newer version of .NET 6.
- You can now use .NET 6 project.

# Create todo app API project

## Create a new ASP.NET Core minimal APIs project
- Run:
```sh
$ dotnet-sdk.dotnet new web -o MinimalApi
```
- This will create a new ASP.NET Core minimal API inside `MinimalApi` folder.
- CD to `MinimalApi` folder and open VS Code with the command `code .`.
```sh
$ cd MinimalApi
$ code .
```

## Current project structure
- Optionally, you can check project file structure with `tree` command.
```sh
$ tree MinimalApi -I 'bin|obj'
MinimalApi
├── MinimalAPI.csproj
├── Program.cs
├── Properties
│   └── launchSettings.json
├── appsettings.Development.json
└── appsettings.json
```


## Run the project
- In VS Code, open an integrated terminal and run:
```sh
$ dotnet-sdk.dotnet run
```
- Open a browser and navigate to `http://localhost:5000`, you should find `Hello World!` message.

## Install packages for using EF Core ORM
- In an integrated terminal, run the following commands:
```sh
$ dotnet-sdk.dotnet add package Microsoft.EntityFrameworkCore --version 6.0.0-preview.5.21301.9
$ dotnet-sdk.dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 6.0.0-preview.5.21301.9
```

## Create a single file todo app API
- Replace contents of `Program.cs` with the following source code:

```js
// Program.cs
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Create a builder.
var builder = WebApplication.CreateBuilder(args);

// Configure EF to use in-memory database, for testing purpose only.
builder.Services.AddDbContext<TodoDbContext>(options => options.UseInMemoryDatabase("TodoItems"));

// Create a new web app.
await using var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.MapGet("/", (Func<string>)(() => "Hello World!"));

app.MapGet("/todos", async (http) =>
{
    var dbContext = http.RequestServices.GetRequiredService<TodoDbContext>();
    var todos = await dbContext.TodoItems.ToListAsync();
    await http.Response.WriteAsJsonAsync(todos);
});

app.MapGet("/todos/{id}", async (http) =>
{
    if (!http.Request.RouteValues.TryGetValue("id", out var id))
    {
        http.Response.StatusCode = 400;
        return;
    }

    var dbContext = http.RequestServices.GetRequiredService<TodoDbContext>();
    var todo = await dbContext.TodoItems.FindAsync(int.Parse(id.ToString()));
    if (todo == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    await http.Response.WriteAsJsonAsync(todo);
});

app.MapPost("/todos", async (http) =>
{
    var todo = await http.Request.ReadFromJsonAsync<TodoItem>();
    var dbContext = http.RequestServices.GetRequiredService<TodoDbContext>();

    dbContext.TodoItems.Add(todo);
    await dbContext.SaveChangesAsync();
    http.Response.StatusCode = 201;
});

app.MapPut("/todos/{id}", async (http) =>
{
    if (!http.Request.RouteValues.TryGetValue("id", out var id))
    {
        http.Response.StatusCode = 400;
        return;
    }

    var dbContext = http.RequestServices.GetRequiredService<TodoDbContext>();
    var todo = await dbContext.TodoItems.FindAsync(int.Parse(id.ToString()));
    if (todo == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    var todoRequest = await http.Request.ReadFromJsonAsync<TodoItem>();
    todo.IsCompleted = todoRequest.IsCompleted;
    await dbContext.SaveChangesAsync();
    http.Response.StatusCode = 204;
});

app.MapDelete("/todos/{id}", async (http) =>
{
    if (!http.Request.RouteValues.TryGetValue("id", out var id))
    {
        http.Response.StatusCode = 400;
        return;
    }

    var dbContext = http.RequestServices.GetRequiredService<TodoDbContext>();
    var todo = await dbContext.TodoItems.FindAsync(int.Parse(id.ToString()));
    if (todo == null)
    {
        http.Response.StatusCode = 404;
        return;
    }

    dbContext.TodoItems.Remove(todo);
    await dbContext.SaveChangesAsync();

    http.Response.StatusCode = 204;
});

await app.RunAsync();

// Define TodoItem model
class TodoItem
{
    public int Id { get; set; }

    public string Title { get; set; }

    public bool IsCompleted { get; set; }
}

// Define TodoDbContext
class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions options) : base(options) { }
    public DbSet<TodoItem> TodoItems { get; set; }
}

```
- Save all files.

## Run todo app API
- In an integrated terminal, run the following command:
```sh
$ dotnet-sdk.dotnet run
```
- You can now test APIs with any client tools, e.g. Postman.
- All available APIs:
  - Use http://localhost:5000/todos with HTTP GET to get all existing todo items.
  - Use http://localhost:5000/todos with HTTP POST to add a new todo item.
  - Use http://localhost:5000/todos/{id} with HTTP PUT to update an existing todo item.
  - Use http://localhost:5000/todos/{id} with HTTP DELETE to delete an existing todo item.


# Useful information and credit
- Jose Barbosa for his amazing repository https://github.com/kidchenko/dot-net-min-api.
- Pre-installed Snapd distributions https://snapcraft.io/docs/installing-snapd#heading--pre-installed
- ubuntu-wsl2-systemd-script https://github.com/DamionGans/ubuntu-wsl2-systemd-script
- Unmask Snapd https://askubuntu.com/a/1258139
- [ASP.NET Core updates in .NET 6 Preview 4](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-4/)
