# Slideshow

## Props
| Name                              | Type    | Default | Required | Description                                                        |
| --------------------------------- | ------- | ------- | -------- | ------------------------------------------------------------------ |
| captions                          | Bool    | false   | false    |                                                                    |
| [slides](#markdown-header-slides) | Arrayof |         | false    |                                                                    |
| [margin](#markdown-header-margin) | OneOf   |         | false    | Margin can be either a string, or an object with top/bottom margin |

## Complex Props

--------------------------------------------------------------------------------

### slides
Type: _Arrayof_

**slides** is an array of the following type:

| Name                              | Type   | Required |
| --------------------------------- | ------ | -------- |
| src                               | String | true     |
| alt                               | String | false    |
| [device](#markdown-header-device) | Enum   | false    |

#### device
Type: _Enum_

* 'iphone'
* 'ipad'
* 'desktop'
* 'android'
* 'androidTablet'
* 'windowsPhone'
* 'surface'

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
