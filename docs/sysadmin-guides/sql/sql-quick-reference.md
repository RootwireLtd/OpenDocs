---
title: SQL Quick Reference
---

## Comments

### Inline

```sql
# This is an inline comment (but less commonly supported)
SELECT user_id -- This is an inline comment
FROM users
```

### Block

```sql
/* This is a 
block comment
over multiple
lines */
SELECT user_id
FROM users
```

## Retrieve Data

### Retrieve a Single Column

```sql
SELECT user_id
FROM users
```

### Retrieve Multiple Columns

```sql
SELECT user_id, user_name, user_birthday
FROM users
```

## Retrieve Distinct data

```sql
SELECT DISTINCT user_id
FROM users
```

## Limiting Results

Get the First 5 rows

### Postgres / MySQL / MariaDB / SQLite

```sql
SELECT user_id
FROM users
LIMIT 5
```

Get Next 5 rows

```sql
SELECT user_id
FROM users
LIMIT 5 OFFSET 5
```

### TSQL

```sql
SELECT TOP 5 user_id
FROM users
```

### DB2

```sql
SELECT user_id
FROM users
FETCH FIRST 5 ROWS ONLY
```

### Oracle

```sql
SELECT user_id
FROM users
WHERE ROW_num <=5
```

## Sorting

`ORDER BY` always comes at the end of the `SELECT` statement

### Sorting a Single Column

```sql
SELECT user_id, user_name
FROM users
ORDER BY user_name
```

### Sorting Multiple Columns

```sql
SELECT user_id, user_name
FROM users
ORDER BY user_name, user_id, user_birthday -- order by columns don't have to be selected
```

#### ORDER BY Column Position

```sql
SELECT user_id, user_name, user_birthday
FROM users
ORDER BY 2, 3
```

### Specifying Sort Direction

ASC stands for Ascending and sorts from A-Z / 0-9
DESC stands for Descending and sorts from Z-A / 9-0

```sql
SELECT user_id, user_name
FROM users
ORDER BY user_name DESC
```

## Filtering

Where Clause operators

| Operator      | Description                  |
| ------------- | ---------------------------- |
| `=`           | Equality                     |
| `<>`          | Non-Equality                 |
| `!=`          | Non-Equality                 |
| `<`           | Less Than                    |
| `<=`          | Less Than or Equal           |
| `!<`          | Not Less Than                |
| `>`           | Greater Than                 |
| `>=`          | Greater Than or Equal        |
| `!>`          | Not Greater Than             |
| `BETWEEN`     | Between two specified values |
| `IS NULL`     | Is a NULL Value              |
| `IS NOT NULL` | Is not a NULL Value              |

### Filter on a Single Value

```sql
SELECT user_id, user_name
FROM users
WHERE user_name = 'Edward'
```

### Filter on Multiple Values

```sql
SELECT user_id, user_name
FROM users
WHERE user_name = 'Edward'
AND user_id BETWEEN 5 AND 10
AND user_birthday IS NOT NULL
```

### Order of Operations

The below statement will return all users named Edward regardless of user_id, and users named Jane whose user_id is between 5 and 10. This might not be what is intended.

```sql
SELECT user_id
FROM users
WHERE user_name = 'Edward'
OR user_name = 'Jane'
AND user_id BETWEEN 5 AND 10
```

To explicitly group operations, use brackets. This will return all users named 'Edward' or 'Jane' where Edward and Jane's user_id is between 5 and 10

```sql
SELECT user_id
FROM users
(
    WHERE user_name = 'Edward'
    OR user_name = 'Jane'
)
AND user_id BETWEEN 5 AND 10
```

### Conditional Ranges

The statement

```sql
SELECT user_id
FROM users
WHERE user_name IN ('Edward', 'Jane')
ORDER BY user_birthday
```

is equivalent to

```sql
SELECT user_id
FROM users
WHERE user_name = 'Edward'
OR user_name = 'Jane'
ORDER BY user_birthday
```

### NOT operator

NOT flips the true/false result of a statement

This statement gets all user_id's where the user_name is 'Edward'

```sql
SELECT user_id
FROM users
WHERE user_name = 'Edward'
```

This statement gets all user_id's where the user_name is anything other than 'Edward'

```sql
SELECT user_id
FROM users
WHERE NOT user_name = 'Edward'
```

## WildCard Filtering

The `LIKE` operator evaluates against patterns as opposed to known values.

Technically `LIKE` is a predicate, but it works the same.

### The % Wildcard

`%` matches zero, one, or more characters at the location it is placed in a search pattern

Searching for all user_id's where the user_name starts with 'Ed'

```sql
SELECT user_id
FROM users
WHERE user_name LIKE 'Ed%'
```

Searching for all user_id's where the user_favourite_quote contains the word 'box of chocolates'

```sql
SELECT user_id
FROM users
WHERE user_favourite_quote LIKE '%box of chocolates%'
```

Wildcards in the middle of the string can be useful when Searching for email addresses

```sql
SELECT user_id
FROM users
WHERE user_email LIKE 'bryan%@rootwirelabs.co.uk'
```

You may need to add a trailing `%` for DBMS's that don't automatically trim whitespace from the end of strings

```sql
SELECT user_id
FROM users
WHERE user_email LIKE 'bryan%@rootwirelabs.co.uk%'
```

### The Underscore (_) Wildcard

The `_` wildcard matches a single character only

Find users who have particularly long legs

```sql
SELECT user_id
FROM users
WHERE user_longest_limb LIKE '_ cm leg'
```

### The Brackets ([]) Wildcard

The `[]` wildcard matches a set of characters, any one of which must be present at the specified position

Find all users whose name begins with 'A' or 'J'

```sql
SELECT user_id
FROM users
WHERE user_name LIKE '[AJ]%'
```

The `[]` Wildcard can be negated by prefixing the carat `^` character

Find all users whose name does not being with 'A' or 'J'

```sql
SELECT user_id
FROM users
WHERE user_name LIKE '[^AJ]%'
```
