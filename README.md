# Data Service Layer

## Description

This layer is on top of the adapter layer and after the business.
It is responsible of managing the form of the data in order to make the communication between different
services easier. For example, it transforms the data from the external resources into an object that
the business layer can understand. On the other hand, it also transforms the data from the business layer
into a format that the adapter layer can use to call external rosources or store in the database.

## Responsibilities

-   Transform the data from the external resources into an object that the business layer can understand.
-   Transform the data from the business layer into a format that the adapter layer can use to call external rosources or store in the database.

## API

The data returned by this layer is a JSON object with the following structure:

```json
{
    "data": {
        // The data requested
    }
}
```

In case of error:

```json
{
    "error": {
        "message": "Error message",
        "code": "ErrorCode"
    }
}
```
