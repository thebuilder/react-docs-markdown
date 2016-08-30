# ContentRibbon

## Props
| Name                                               | Type   | Default | Required | Description                                                        |
| -------------------------------------------------- | ------ | ------- | -------- | ------------------------------------------------------------------ |
| component                                          | Node   |         | false    |                                                                    |
| className                                          | String |         | false    |                                                                    |
| contentClassName                                   | String |         | false    |                                                                    |
| isSplit                                            | Bool   | false   | false    |                                                                    |
| centered                                           | Bool   | false   | false    |                                                                    |
| [headline](#markdown-header-headline)              | Object |         | false    |                                                                    |
| content                                            | String |         | false    |                                                                    |
| backgroundImage                                    | String |         | false    |                                                                    |
| backgroundPadding                                  | Bool   | false   | false    |                                                                    |
| [backgroundSize](#markdown-header-background-size) | Enum   |         | false    |                                                                    |
| backgroundColor                                    | String |         | false    |                                                                    |
| color                                              | String |         | false    |                                                                    |
| [link](#markdown-header-link)                      | Object |         | false    |                                                                    |
| [margin](#markdown-header-margin)                  | OneOf  |         | false    | Margin can be either a string, or an object with top/bottom margin |

## Complex Props

--------------------------------------------------------------------------------

### headline
Type: _Object_

**headline** is an object with:

| Name  | Type   | Required |
| ----- | ------ | -------- |
| text  | String | false    |
| small | Bool   | false    |

--------------------------------------------------------------------------------

### backgroundSize
Type: _Enum_

**backgroundSize** should be one of the following values:

* 'cover'
* 'contain'

--------------------------------------------------------------------------------

### link
Type: _Object_

**link** is an object with:

| Name   | Type   | Required |
| ------ | ------ | -------- |
| href   | String | true     |
| label  | String | false    |
| target | String | false    |

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
