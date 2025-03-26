---
title: FluentAssertions
showMetadata: true
editable: true
showToc: true
---

สมมติว่าเรามี Data Structure ดังนี้ คำถามคือเราจะ Assert อย่างไร

```cs
public class Todo
{
    public int ID  { get; set; }
    public string Title  { get; set; }
    public bool Completed  { get; set; }
}

public class TodoList
{

    public IEnumerable<Todo> GetTodoList()
    {
        return new []
        {
            new Todo{
                ID = 0,
                Title = "Shopping",
                Completed = false
            },
            new Todo{
                ID = 1,
                Title = "Running",
                Completed = true
            },
            new Todo{
                ID = 2,
                Title = "Reading a book",
                Completed = false
            }
        };
    }
}
```

ถ้าใช้ xUnit อย่างเดียว อาจจะยุ่งยาก ลองใช้ [FluentAssertions](https://www.nuget.org/packages/FluentAssertions)

# Getting Started

1. ติดตั้ง [FluentAssertions](https://www.nuget.org/packages/FluentAssertions)

    ```sh
    dotnet add package FluentAssertions --version 5.10.3
    ```

2. เรียก `using FluentAssertions;` แล้วเราสามารถใช้งาน [FluentAssertions](https://www.nuget.org/packages/FluentAssertions) ได้เลย

    ```cs
    using Xunit;
    using FluentAssertions;

    public class TodoListTest
    {

        [Fact]
        public void GetTodoListTest()
        {

            var todoList = new TodoList();
            var expected =  new []
            {
                new Todo{
                    ID = 0,
                    Title = "Shopping",
                    Completed = false
                },
                new Todo{
                    ID = 1,
                    Title = "Running",
                    Completed = true
                },
                new Todo{
                    ID = 2,
                    Title = "Reading a book",
                    Completed = false
                }
            };

            var result = todoList.GetTodoList();
            result.Should().BeEquivalentTo(expected);
        }
    }
    ```

# Ref

- https://fluentassertions.com/
