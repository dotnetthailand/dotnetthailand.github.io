---
title: NLog
showMetadata: true
editable: true
showToc: true
---

# How to setup NLog

- Create a new .NET Framework console project. This can be applied to .NET Core
- Install NLog Nuget package.

```
install-package NLog

```

- Edit NLog.config file

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.nlog-project.org/schemas/NLog.xsd NLog.xsd"
      autoReload="true"
      throwExceptions="false"
      internalLogLevel="Off" internalLogFile="c:\temp\nlog-internal.log">

    <!-- optional, add some variables
    https://github.com/nlog/NLog/wiki/Configuration-file#variables
    -->
    <variable name="myvar" value="myvalue"/>

    <!--
    See https://github.com/nlog/nlog/wiki/Configuration-file
    for information on customizing logging rules and outputs.
    -->
    <targets>
      <target xsi:type="File" name="Logfile"
              fileName="${basedir}/Logs/date-${date:format=yyyyMMdd}.log"
              archiveAboveSize="10485760"
              layout="${longdate} | ${mdc:item=Message}" />
    </targets>

    <rules>
      <logger name="Logfile" minlevel="Trace" writeTo="Logfile" />
     </rules>
</nlog>
```

- Set up the main class.

```c#
  // Import NLog classes.
  using NLog;

  public static class Program
  {
      public static void Main(string[] args)
      {
          Logger logger = LogManager.GetCurrentClassLogger();
          logger = LogManager.GetLogger("Logfile");
          MappedDiagnosticsContext.Set("Message", "Hello NLog");
          logger.Log(LogLevel.Trace, "");
      }
  }
```