---
title: ASP.NET Core minimal APIs
showMetadata: true
editable: true
---

# A single file ASP.NET Core minimal APIs

# Install .NET on WSL2 Ubuntu
Follow [this instruction](/programming-cookbook/wsl-powershell-useful-scripts/install-dotnet) to install .NET on WSL2.

# Create todo app API project

## Create a new ASP.NET Core minimal APIs project
- Create a new project from a template with the following command:
  ```sh
    dotnet new web -o MinimalApi
  ```
- This will create a new ASP.NET Core minimal API inside a `MinimalApi` folder.
- CD to a `MinimalApi` folder and open it with VS Code by executing `code .`.
  ```sh
    cd MinimalApi
    code .
  ```

## Current project structure
- Optionally, you can check project file structure with `tree` command.
  ```sh
    tree MinimalApi -I 'bin|obj'
    MinimalApi
    ├── MinimalAPI.csproj
    ├── Program.cs
    ├── Properties
    │   └── launchSettings.json
    ├── appsettings.Development.json
    └── appsettings.json
  ```

## Run the project
- Open `Program.cs` with VS Code and edit it to pass `http://localhost:3000` to `app.Run` method.
  ```cs
  // Program.cs
  // ...
      app.Run("http://localhost:3000");
  // ...
  ```
- Open a VS Code's integrated terminal and run:
  ```sh
    dotnet run
  ```
- Open a browser and navigate to `http://localhost:3000`, you should see `Hello World!` message on a home page.

## Install packages for using EF Core ORM
- In an integrated terminal, run the following commands:
  ```sh
    dotnet add package Microsoft.EntityFrameworkCore --version 6.0.4
    dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 6.0.4
  ```

## Create a single file todo app API
- Replace contents of `Program.cs` with the following source code:
  ```cs
    // Program.cs
    using Microsoft.EntityFrameworkCore;

    // Create a builder.
    var builder = WebApplication.CreateBuilder(args);

    // Configure EF to use in-memory database, for testing purpose only.
    builder.Services.AddDbContext<TodoDbContext>(
        options => options.UseInMemoryDatabase("TodoItems")
    );

    // Create a new web app.
    using var app = builder.Build();
    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-6.0#responses
    app.MapGet("/", (Func<string>)(() => "Hello World!"));

    app.MapGet("/todos", async (HttpContext http, TodoDbContext todoContext) =>
    {
        var todos = await todoContext.TodoItems.ToListAsync();
        return todos;
    });

    app.MapGet("/todos/{id}", async (HttpContext http, TodoDbContext todoContext, int? id) =>
    {
        if (!id.HasValue)
        {
            return Results.BadRequest();
        }

        var todo = await todoContext.TodoItems.FindAsync(id);
        if (todo == null)
        {
            return Results.NotFound();
        }

        return Results.Ok(todo);
    });

    app.MapPost("/todos", async (HttpContext http, TodoDbContext dbContext, TodoItem todo) =>
    {
        dbContext.TodoItems.Add(todo);
        await dbContext.SaveChangesAsync();
        http.Response.StatusCode = 201; // Created
    });

    app.MapPut("/todos/{id}", async (HttpContext http, TodoDbContext dbContext, TodoItem changedTodo, int? id) =>
    {
        if (!id.HasValue)
        {
            return Results.BadRequest();
        }

        var exisingTodo = await dbContext.TodoItems.FindAsync(id);
        if (exisingTodo == null)
        {
            return Results.NotFound();
        }

        exisingTodo.Title = changedTodo.Title;
        exisingTodo.IsCompleted = changedTodo.IsCompleted;
        await dbContext.SaveChangesAsync();

        return Results.NoContent();
    });

    app.MapDelete("/todos/{id}", async (HttpContext http, TodoDbContext dbContext, int? id) =>
    {
        if (!id.HasValue)
        {
            return Results.BadRequest();
        }

        var todo = await dbContext.TodoItems.FindAsync(id);
        if (todo == null)
        {
            return Results.NotFound();
        }

        dbContext.TodoItems.Remove(todo);
        await dbContext.SaveChangesAsync();
        return Results.NoContent();
    });

    app.Run("http://localhost:3000");

    // Define TodoItem model
    class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
        public TodoItem(string title) => Title = title;
    }

    // Define TodoDbContext
    class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions options) : base(options) { }
        public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    }
  ```

- Save the file.

## Run todo app API
- In an integrated terminal, run the following command. (Kill the running process if needed.):
  ```sh
    dotnet run
  ```
- You can now test APIs with any client tools, e.g. Postman.
- All available APIs:
  - Use http://localhost:3000/todos with HTTP *GET* to get all existing todo items.
  - Use http://localhost:3000/todos/{id} with HTTP *GET* to get an existing todo item.
  - Use http://localhost:3000/todos with HTTP *POST* to add a new todo item.
  - Use http://localhost:3000/todos/{id} with HTTP *PUT* to update an existing todo item.
  - Use http://localhost:3000/todos/{id} with HTTP *DELETE* to delete an existing todo item.

# Useful information and credit
- Jose Barbosa for his amazing repository https://github.com/kidchenko/dot-net-min-api.
- [.NET 6 installation instructions for Linux from .NET repository](https://github.com/dotnet/core/blob/main/release-notes/6.0/install-linux.md)
- Pre-installed Snapd distributions https://snapcraft.io/docs/installing-snapd#heading--pre-installed
- ubuntu-wsl2-systemd-script https://github.com/DamionGans/ubuntu-wsl2-systemd-script
- Unmask Snapd https://askubuntu.com/a/1258139
- [ASP.NET Core updates in .NET 6 Preview 4](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-4/)
