*Enum**
* 'none'
* 'small'
* 'large'
    ✓ should convert


  1 passing (3ms)



  Docs to markdown
# CaseList

## Props
| Name                                | Type    | Required | Default | Description                                                        |
| ----------------------------------- | ------- | -------- | ------- | ------------------------------------------------------------------ |
| [backgroundColor](#backgroundColor) | string  | true     |         |                                                                    |
| [title](#title)                     | string  | false    |         |                                                                    |
| [content](#content)                 | string  | true     |         | Rich Text HTML                                                     |
| [items](#items)                     | arrayOf | true     |         |                                                                    |
| [margin](#margin)                   | oneOf   | false    | 'small' | Margin can be either a string, or an object with top/bottom margin |

### items
Array containing:

**Object**
```
{
  "className": {
    "name": "string",
    "required": false
  },
  "backgroundColor": {
    "name": "string",
    "required": false
  },
  "backgroundImage": {
    "name": "string",
    "required": false
  },
  "color": {
    "name": "string",
    "required": false
  },
  "fullWidth": {
    "name": "bool",
    "required": false
  },
  "category": {
    "name": "string",
    "required": false
  },
  "title": {
    "name": "string",
    "required": true
  },
  "body": {
    "name": "string",
    "required": false
  },
  "link": {
    "name": "shape",
    "value": {
      "href": {
        "name": "string",
        "required": true
      },
      "target": {
        "name": "string",
        "required": false
      }
    },
    "required": true
  },
  "preview": {
    "name": "shape",
    "value": {
      "image": {
        "name": "string",
        "required": true
      },
      "type": {
        "name": "enum",
        "value": [
          {
            "value": "'iphone'",
            "computed": false
          },
          {
            "value": "'ipad'",
            "computed": false
          },
          {
            "value": "'desktop'",
            "computed": false
          },
          {
            "value": "'dual'",
            "computed": false
          }
        ],
        "required": true
      }
    },
    "required": false
  }
}
```

### margin
Should be one of the following:

**Object**
```
{
  "top": {
    "name": "enum",
    "value": [
      {
        "value": "'none'",
        "computed": false
      },
      {
        "value": "'small'",
        "computed": false
      },
      {
        "value": "'large'",
        "computed": false
      }
    ],
    "required": false
  },
  "bottom": {
    "name": "enum",
    "value": [
      {
        "value": "'none'",
        "computed": false
      },
      {
        "value": "'small'",
        "computed": false
      },
      {
        "value": "'large'",
        "computed": false
      }
    ],
    "required": false
  }
}
```

**Enum**
* 'none'
* 'small'
* 'large'
