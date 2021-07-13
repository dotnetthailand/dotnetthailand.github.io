---
title: FluentAssertions
showMetadata: true
editable: true
showToc: true
---

สมมติว่าเรามี Data Structure ดังนี้ คำถามคือเราจะ Assert อย่างไร

```c#
public class Todo
{
    public int id  { get; set; }
    public string title  { get; set; }
    public bool completed  { get; set; }
}

public class TodoList
{

    public IEnumerable<Todo> GetTodoList()
    {
        return new Todo[]
        {
            new Todo{
                id = 0,
                title = "Shopping",
                completed = false
            },
            new Todo{
                id = 1,
                title = "Running",
                completed = true
            },
            new Todo{
                id = 2,
                title = "Reading a book",
                completed = false
            }
        };
    }
}
```

ถ้าใช้ xunit อย่างเดียว อาจจะยุ่งยาก ลองใช้ [FluentAssertions](https://www.nuget.org/packages/FluentAssertions)

# Getting Started

1. ติดตั้ง [FluentAssertions](https://www.nuget.org/packages/FluentAssertions)

    ```sh
    dotnet add package FluentAssertions --version 5.10.3
    ```

2. เรียก `using FluentAssertions;` แล้วเราสามารถใช้งาน [FluentAssertions](https://www.nuget.org/packages/FluentAssertions) ได้เลย

    ```c#
    using Xunit;
    using FluentAssertions;

    public class TodoListTest
    {

        [Fact]
        public void GetTodoListTest()
        {

            var todoList = new TodoList();
            var expected =  new Todo[]
            {
                new Todo{
                    id = 0,
                    title = "Shopping",
                    completed = false
                },
                new Todo{
                    id = 1,
                    title = "Running",
                    completed = true
                },
                new Todo{
                    id = 2,
                    title = "Reading a book",
                    completed = false
                }
            };
            
            var result = controller.GetTodoList();
            result.Should().BeEquivalentTo(expected);
        }
    }
    ```

# Ref

- https://fluentassertions.com/