### REST API for Contacts App

#### Installation

1. Install Node.js (v8.11.3 preferable)
2. `npm install -g yarn`
3. Clone the project: `git clone https://github.com/lunaticmonk/happyfox-challenge.git`
4. cd into the folder i.e `cd happyfox-challenge`
5. yarn
6. Install MongoDB
7. Create a .env and copy the contents of .env.default in .env.
8. Set the .env variables correctly.
9. Run `yarn dev`.

#### Tests

I have added only integration tests since there was almost no business logic(being a simple CRUD) for unit tests.

To run tests

> `yarn test`

#### Endpoints

### 1. Contact Resource

##### Endpoints

1. Save new contact

```json
POST `/api/contact/add`

Body

{
	"name": "carice",
	"email": {
		"value": "carice@got.co",
		"tag": "work"
	},
	"phone": {
		"value": "0987654321",
		"tag": "work"
	}
}

Response

{
    "data": {
        "_id": "5ce3da2d2755510dfe7affd3",
        "name": "carice",
        "phone": [
            {
                "value": "0987654321",
                "tag": "work"
            }
        ],
        "email": [
            {
                "value": "carice@got.co",
                "tag": "work"
            }
        ],
        "createdAt": "2019-05-21T10:59:57.521Z",
        "updatedAt": "2019-05-21T10:59:57.521Z",
        "__v": 0
    },
    "message": "Contact saved!",
    "status": 200
}

```

2. Get a contact provided the uuid.

```json
GET /api/contact/:uuid

Response

{
    "data": {
        "_id": "5ce3da2d2755510dfe7affd3",
        "name": "caricevanhouten",
        "phone": [
            {
                "value": "0987654321",
                "tag": "work"
            }
        ],
        "email": [
            {
                "value": "carice@got.co",
                "tag": "work"
            }
        ],
        "createdAt": "2019-05-21T10:59:57.521Z",
        "updatedAt": "2019-05-21T11:08:03.748Z",
        "__v": 0
    },
    "message": "Returned contact",
    "status": 200
}
```

3. Update a contact.

```json
PATCH /api/contact/:uuid

Body

{
	"name": "caricevanhouten",
	"phone": [
		{
			"value": "0987654321",
             "tag": "personal"
		}
	]
}

Response

{
    "data": {
        "_id": "5ce3da2d2755510dfe7affd3",
        "name": "caricevanhouten",
        "phone": [
            {
                "value": "0987654321",
                "tag": "personal"
            }
        ],
        "email": [
            {
                "value": "carice@got.co",
                "tag": "work"
            }
        ],
        "createdAt": "2019-05-21T10:59:57.521Z",
        "updatedAt": "2019-05-21T11:49:30.109Z",
        "__v": 0
    },
    "message": "Contact updated!",
    "status": 200
}

```

4. Delete a contact

```json
DELETE /api/contact/:uuid

Response

{
    "message": "Contact with contact name: caricevanhouten deleted!",
    "status": 200
}

```

5. Search a contact

```json

GET /api/contact/search?query=<name_email_or_phone>

Example query = "carice"

Response

{
    "data": [
        {
            "_id": "5ce3e6646b9e1b1a62c4795d",
            "name": "carice",
            "phone": [
                {
                    "value": "0987654321",
                    "tag": "work"
                }
            ],
            "email": [
                {
                    "value": "carice@got.co",
                    "tag": "work"
                }
            ],
            "createdAt": "2019-05-21T11:52:04.423Z",
            "updatedAt": "2019-05-21T11:52:04.423Z",
            "__v": 0
        }
    ],
    "message": "Returned matches",
    "status": 200
}


```

### 2. Group Resource

1. Add a new group

```json
POST /api/group/add

Body

{
	"name": "Family",
	"contacts": ["5ce3e6646b9e1b1a62c4795d", "5ce3da1f2755510dfe7affd2"]
}

Response

{
    "data": {
        "contacts": [
            "5ce3e6646b9e1b1a62c4795d",
            "5ce3da1f2755510dfe7affd2"
        ],
        "_id": "5ce3e67c6b9e1b1a62c4795f",
        "name": "Family",
        "createdAt": "2019-05-21T11:52:28.393Z",
        "updatedAt": "2019-05-21T11:52:28.393Z",
        "__v": 0
    },
    "message": "Group added!",
    "status": 200
}

```

2. Get a group i.e group details.

```json

GET /api/group/:uuid

Response

{
    "data": {
        "contacts": [
            {
                "name": "carice",
                "phone": [
                    {
                        "value": "0987654321",
                        "tag": "work"
                    }
                ],
                "email": [
                    {
                        "value": "carice@got.co",
                        "tag": "work"
                    }
                ]
            },
            {
                "name": "bran",
                "phone": [
                    {
                        "value": "9333347562",
                        "tag": "work"
                    }
                ],
                "email": [
                    {
                        "value": "s@polygonapp.co",
                        "tag": "work"
                    }
                ]
            }
        ],
        "_id": "5ce3e67c6b9e1b1a62c4795f",
        "name": "Family",
        "createdAt": "2019-05-21T11:52:28.393Z",
        "updatedAt": "2019-05-21T11:52:28.393Z",
        "__v": 0
    },
    "message": "Group found!",
    "status": 200
}
```

3. Update a group

```json
PATCH /api/group/:uuid

Body

{
	"name": "Friends",
	"contacts": ["5ce3e6646b9e1b1a62c4795d", "5ce3da1f2755510dfe7affd2", "5ce3e8646b9e1b1a62c47960"]
}

Response

{
    "data": {
        "contacts": [
            "5ce3e6646b9e1b1a62c4795d",
            "5ce3da1f2755510dfe7affd2",
            "5ce3e8646b9e1b1a62c47960"
        ],
        "_id": "5ce3e67c6b9e1b1a62c4795f",
        "name": "Friends",
        "createdAt": "2019-05-21T11:52:28.393Z",
        "updatedAt": "2019-05-21T12:04:23.034Z",
        "__v": 0
    },
    "message": "Group updated!",
    "status": 200
}

```

4. Delete a group

```json
GET /api/group/:uuid

Response

{
    "message": "Group with group name: \"Family\" deleted!",
    "status": 200
}

```
