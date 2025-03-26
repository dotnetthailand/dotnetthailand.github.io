---
title: Send a message to a channel with Discord bot
showMetadata: true
editable: true
showToc: true
---

## Prerequisite
- You have setup Discord Server.
- You have create a new bot and add it to your Discord server.
- Please check ["Making Your First Bot with Discord.Net"](https://discordnet.dev/guides/getting_started/first-bot.html) document for more information.

## Setup .NET project and add required Nuget package
- Create a .NET Console app project with the following command:
  ```sh
  $ dotnet new console --name DiscordClientExample
  ```
- CD to `DiscordClientExample` folder and add a Nuget package with the following command:
  ```sh
  $ dotnet add package Discord.Net
  ```

## Update code to send a message to Discord channel
- Open the project with VS Code.
- Open `Program.cs` file and update the code as following:
  ```cs
  using Discord;
  using Discord.WebSocket;

  const string botToken = @"";
  ulong channelId = 0;

  var client = new DiscordSocketClient();
  await client.LoginAsync(TokenType.Bot, botToken);
  await client.StartAsync();

  var channel = await client.GetChannelAsync(channelId) as IMessageChannel;
  await channel!.SendMessageAsync("Hello world");
  ```
- Get bot's token from [Discord application portal](https://discord.com/developers/applications/) and set it as value of `botToken` variable.
- Get ID of a channel that you want to send a message to. [You must enable developer mode before you can get a channel ID.](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) Set it to channelId variable;

## Run the project
- Open VS Code integrated terminal with ``` ctrl+` ``` shotcut.
- Then execute the follow command:
  ```sh
  $ dotnet run
  ```
## Verify if we have message from Discord bot in a chanel
- If everything works properly, you should find `Hello world` message in a Discord channel.

## Update code to send an embedded message to Discord channel

### Send a message with an image that is hosted on a server.
- Open `Program.cs` file and update the code as following:
  ```cs
  using Discord;
  using Discord.WebSocket;

  const string botToken = @"";
  ulong channelId = 0;

  var client = new DiscordSocketClient();
  await client.LoginAsync(TokenType.Bot, botToken);
  await client.StartAsync();

  var embed = new EmbedBuilder()
      .WithImageUrl("https://openclipart.org/image/800px/103855") // a URL of an image
      .Build();

  var channel = await client.GetChannelAsync(channelId) as IMessageChannel;
  // TTS (text to speech), to set whether the message should be read aloud by Discord or not.
  await channel!.SendMessageAsync(text: "We ♥ Linux.", isTTS: false, embed: embed);
  ```

### Send a message with a stream image data
- This can be useful when you want to use a local image and upload it to Discord server.
- Open `Program.cs` file and update the code as following:
  ```cs
  using Discord;
  using Discord.WebSocket;

  const string botToken = @"";
  ulong channelId = 0;

  var client = new DiscordSocketClient();
  await client.LoginAsync(TokenType.Bot, botToken);
  await client.StartAsync();

  // The attached file name must match the one sent to Discord
  const string fileName = "tux.png";
  var embed = new EmbedBuilder()
      .WithImageUrl($"attachment://{fileName}")
      .WithDescription("We ♥ Linux.")
      .Build();

  using var memoryStream = new MemoryStream();
  var fileUrl = "https://openclipart.org/image/800px/103855";
  using var downloadedStream = await new HttpClient().GetStreamAsync(fileUrl);
  await downloadedStream.CopyToAsync(memoryStream);

  var channel = await client.GetChannelAsync(channelId) as IMessageChannel;
  await channel!.SendFileAsync(stream: memoryStream, filename: fileName, embed: embed);
  ```

### Send a colored message.
- You can send colored text within ANSI code blocks by using ANSI escape code.
- Here is the syntax `\u001b + "[" + <zero or more numbers, separated by ";"> + <a letter>`
- The number between `[` and `m` represent text format, foreground and background color. e.g 1:bold, 31:red foreground, 47:white background.
- *Note* for the escape, using `\u0001` does not work for me. I need to copy ESC () unicode and use it directly.
- Use the following code to send a bold text with red color and white background.
~~~
```ansi
[1;31;47m Hello World [0m
```
~~~
- We use `[0m\n` at the end to reset color back to normal.

## Reference
- [Discord.Net repository](https://github.com/discord-net/Discord.Net)
- [Making Your First Bot with Discord.Net](https://discordnet.dev/guides/getting_started/first-bot.html)
- [Where can I find my User/Server/Message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
- [Using a local image with EmbedBuilder](https://stackoverflow.com/a/63462663/1872200)
- [Discord ANSI text](https://www.pythondiscord.com/pages/guides/python-guides/discord-messages-with-colors/)
- [Discussion Discord on ANSI text](https://gist.github.com/kkrypt0nn/a02506f3712ff2d1c8ca7c9e0aed7c06)
- [String in C# and .NET](https://csharpindepth.com/articles/Strings)
- [Everything you never wanted to know about ANSI escape codes](https://notes.burke.libbey.me/ansi-escape-codes/)
- [List of ANSI color escape sequences](https://stackoverflow.com/a/33206814/1872200)
