---
title: log4net
showMetadata: true
editable: true
showToc: true
order: 3
---

# How to setup log4net

- Create a new .NET Framework console project. This can be applied to .NET Core

- Install log4net Nuget package.
```
install-package log4net

```

- Set up the main class.
```
  // Import log4net classes.
  using log4net;
  using log4net.Config;

  public static class Program
  {
      // Define a static logger variable so that it references the
      // Logger instance named "Program".
      private static readonly ILog log = LogManager.GetLogger(typeof(Program));

      public static void Main(string[] args)
      {
          // Set up an XmlConfigurator to use log4net XML configuration file
          XmlConfigurator.Configure(new FileInfo("log4net.config"));

          log.Info("Entering application.");
      }
  }
```

- Create `log4net.config` file at root level of the project and set "copy to output directory" as "copy as newer".
- Add configuration content to log4net.config.

# Rolling file appender

```
<?xml version="1.0" encoding="utf-8" ?>
<log4net>
	<!--
		 Roll log files on a date period and within a date period on file size.
		 For each day only the last 10 files of 1MB will be kept.
		 We can't keep a file on date/time boundaries, more details https://issues.apache.org/jira/browse/LOG4NET-27
		 This problem is fixed by creating a cron job to delete log files and keep some latest days/months.
	 -->
	<appender name="RollingLogFileAppender" type="log4net.Appender.RollingFileAppender">
		<!-- The location of the logging file which is relative to the application base directory -->
		<!-- You will find a log file in bin/Debug/logs folder -->
		<file value="logs/" />
		<appendToFile value="true" />
		<rollingStyle value="Composite" />

		<!-- Define the date pattern as a file name and create a log file for each day-->
		<!-- For more format https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings -->
		<!--<datePattern value="yyyy-MM-dd-HH-mm-ss.'log'" /> create a new file every second, useful for debugging  -->
		<datePattern value="yyyy-MM-dd.'log'" />

		<!--
			Set to true to always logs to log.txt and then renames the rolling file when appropriate.
			It makes the active log file super obvious.
		-->
		<staticLogFileName value="false"/>
		<maxSizeRollBackups value="10" />
		<maximumFileSize value="1MB" />
		<layout type="log4net.Layout.PatternLayout">
		<!-- https://logging.apache.org/log4net/log4net-1.2.13/release/sdk/log4net.Layout.PatternLayout.html -->
			<conversionPattern value="%date{yyyy-mm-yy HH:mm:ss:fff} [%-5level] line:%line method:%method - %message%newline" />
		</layout>
	</appender>

	<root>
		<!-- To log all message levels -->
		<level value="all" />
		<appender-ref ref="RollingLogFileAppender" />
	</root>
</log4net>
```
# Example file structure of the project
- Project folder
  - ProjectName.csproj
  - Program.cs
  - log4net.config
  - packages.config

# Logging level
