This is a simple app to teach about functions. The server is finished, as are the client html and css. All that needs done is the client-side javascript.

## API

### Authentication

| Call              | Body                  | Return            |
|-------------------|-----------------------|-------------------|
| POST /signup      | user, pass, isTeacher | { Boolean, User } |
| POST /login       | user, pass            | { Boolean, User } |
| GET /user         |                       | { Boolean, User } |
| POST /logout      |                       | String            |

### Assignments

| Call              | Body          | Return                  |
|-------------------|---------------|-------------------------|
| GET /hw           |               | { Boolean, [HW] }       |
| POST /hw          | name, dueDate | { Boolean, ID }         |
| DELETE /hw        | id            | { Boolean }             |
| GET /students     |               | { Boolean, [Students] } |
| GET /grades       |               | { Boolean, Grades }     |
| GET /grades/:name |               | { Boolean, Grades }     |
| POST /grade       | id, complete  | { Boolean }             |

## Models

User:
```
{
  user: String,
  pass: String,
  isTeacher: Boolean
}
```

HW:
```
{
  id: Number,
  name: String,
  dueDate: Date
}
```

Grades:
```
{
  hw_id: Boolean,
  ...
}
```
