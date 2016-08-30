# CaseList

## Props
| Name                              | Type    | Default | Required | Description                                                        |
| --------------------------------- | ------- | ------- | -------- | ------------------------------------------------------------------ |
| [items](#markdown-header-items)   | Arrayof |         | true     |                                                                    |
| [margin](#markdown-header-margin) | OneOf   | 'small' | false    | Margin can be either a string, or an object with top/bottom margin |

## Complex Props

### items
Type: _Arrayof_

**items** is an array of the following type:

| Name                                | Type   | Required |
| ----------------------------------- | ------ | -------- |
| className                           | String | false    |
| backgroundColor                     | String | false    |
| backgroundImage                     | String | false    |
| color                               | String | false    |
| fullWidth                           | Bool   | false    |
| category                            | String | false    |
| title                               | String | true     |
| body                                | String | false    |
| [link](#markdown-header-link)       | Object | true     |
| [preview](#markdown-header-preview) | Object | false    |

#### link
Type: _Object_

| Name   | Type   | Required |
| ------ | ------ | -------- |
| href   | String | true     |
| target | String | false    |

#### preview
Type: _Object_

| Name                          | Type   | Required |
| ----------------------------- | ------ | -------- |
| image                         | String | true     |
| [type](#markdown-header-type) | Enum   | true     |

##### type
Type: _Enum_

* 'iphone'
* 'ipad'
* 'desktop'
* 'dual'

--------------------------------------------------------------------------------

### margin
Type: _OneOf_

Margin can be either a string, or an object with top/bottom margin

**margin** should be one of the following types:

**1) Object**

| Name                              | Type | Required |
| --------------------------------- | ---- | -------- |
| [top](#markdown-header-top)       | Enum | false    |
| [bottom](#markdown-header-bottom) | Enum | false    |

#### top
Type: _Enum_

* 'none'
* 'small'
* 'large'

#### bottom
Type: _Enum_

* 'none'
* 'small'
* 'large'

**2) Enum**

* 'none'
* 'small'
* 'large'
