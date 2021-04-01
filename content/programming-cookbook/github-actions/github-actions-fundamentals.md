---
title: GitHub Actions fundamentals
showMetadata: true
editable: true
showToc: true
order: 0
---

# Reference for Workflow syntax (YAML)

- https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions

# Workflow commands for GitHub Actions

- https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions
- Actions can communicate with the runner machine to set environment variables, output values used by other actions, add debug messages to the output logs, and other tasks.
- Most workflow commands use the echo command in a specific format, while others are invoked by writing to a file.
- Use in `jobs.<job_id>.steps[*].run`.

# Setting an environment variable

- We can define environment variables at workflow level, job level and step level.
- We can set environment variable with a workflow command in `jobs.<job_id>.steps[*].run` e.g.

```yaml
run: |

  # literal value
  echo "action_state=yellow" >> $GITHUB_ENV

  # value from a secret
  echo "SLACK_WEBHOOK=${{ secrets.SLACK_WEBHOOK }}" >> $GITHUB_ENV
```

# Context and expression syntax for GitHub Actions
- https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions
- Use expression to programmatically set variables in workflow files and access contexts.
- You can combine literals, context references, and functions using operators.
- Contexts are a way to access information about workflow runs, runner environments, jobs and steps.
- Contexts use the expression syntax.

```yaml
# Expression syntax
${{ <expression> }}

if: ${{ <expression> }}
if: <expression> # You can omit {{ }}

# Read context value
${{ <context> }}
${{ env.VARIABLE_NAME }}
```

# Useful predefined contexts

- github.sha

# Environment variables

- https://docs.github.com/en/actions/reference/environment-variables
- To use the value of an environment variable in a workflow file, you should use the `env` context.
- If you want to use the value of an environment variable inside a runner,
  you can use the runner operating system's normal method for reading environment variables. e.g. \$VARIABLE_NAME

```yaml
# Use environment with GitHub `env` context and normal operation system as $ENVIRONMENT_VARIABLE
env:
  FIRST_NAME: Mona
  DAY_OF_WEEK: Mona

if: env.DAY_OF_WEEK == 'Mon'
run: echo "Hello $FIRST_NAME at ${{ env.DAY_OF_WEEK }}"
```

# Run job on a specific repository only

```yaml
jobs:
  job_id:
    name: Job name
    if: github.repository == username/repository-name
```

# Conditional set environment variables

- Useful for switching variables based on a current branch/environment
- https://github.community/t/possible-to-use-conditional-in-the-env-section-of-a-job/135170/3

# Ternary workflow expression

```yaml
${{ github.ref == env.MAIN_BRANCH && secrets.PRO_PUBLISH_PROFILE || secrets.DEV_PUBLISH_PROFILE }}
```

# Run a job based on a condition with if expression

- https://github.blog/changelog/2019-10-01-github-actions-new-workflow-syntax-features/

# Find more virtual environments

- https://github.com/actions/virtual-environments

# An action

- An action is unit of code.
- You can use an action defined in the same repository as the workflow, a public repository, or in a published Docker container image.
- Version of the action:
  - Using the commit SHA of a released action version is the safest for stability and security.
  - Using the specific major action version allows you to receive critical fixes and security patches while still maintaining compatibility. It also assures that your workflow should still work.
  - Using the default branch of an action may be convenient, but if someone releases a new major version with a breaking change, your workflow could break.
- More details https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsuses

```yaml
steps:
  # Reference the major version of a release
  - uses: actions/setup-node@v1
```

# Known issues:

- Workflow level environment variables can't be used at job level, it can only be used in step level.
- https://github.community/t/how-to-set-and-access-a-workflow-variable/17335/6?u=aaronamm
- Workaround is:
  - Set Environment Var
  - Step takes it as input and sets it as the step’s output.
  - Environment variable can now be accessed via ‘needs’.
- Code example:

```yaml
env:
  Deploy: 'false'

jobs:
  prejob:
    runs-on: ubuntu-latest
    outputs:
      envvalue: ${{ steps.setvar.outputs.envvar }}
    steps:
      - name: set value
        id: setvar
        run: |
          echo "::set-output name=envvar::$Deploy"  # get top level env and set it as output
  envcheck:
    needs: [prejob]
    if: ${{needs.prejob.outputs.envvalue=='false'}} # check env value in job level expression now.
    runs-on: [ubuntu-latest]
    steps:
```

# You can use a step's name with step's uses
- https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idsteps

# Specific branch name pattern to trigger an action

- Match on a specific branch
```yaml
on:
  push:
    branches:
      - '*'         # matches every branch that doesn't contain a '/'
      - '*/*'       # matches every branch containing a single '/'
      - '**'        # matches every branch
      - '!master'   # excludes master
```

- Match all branches
```yaml
on: push
on: [push, pull_request]
```
- Ignore branches
```yaml
on:
  push:
    branches-ignore:
      - master
```
